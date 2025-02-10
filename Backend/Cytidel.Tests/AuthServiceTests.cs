using System;
using System.Security.Authentication;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;
using Cytidel.Api.Services;
using Cytidel.Api.Services.Interface;
using Cytidel.Api.Repositories.Interface;
using Cytidel.Api.Models.Auth;
using Cytidel.Api.Data.Entities;
using Microsoft.AspNetCore.Identity;

public class AuthServiceTests
{
    private readonly Mock<IConfiguration> _mockConfiguration;
    private readonly Mock<IAuthValidation> _mockAuthValidation;
    private readonly Mock<IUserRepository> _mockUserRepository;
    private readonly AuthService _authService;

    public AuthServiceTests()
    {
        _mockConfiguration = new Mock<IConfiguration>();
        _mockAuthValidation = new Mock<IAuthValidation>();
        _mockUserRepository = new Mock<IUserRepository>();

        _mockConfiguration.Setup(config => config["Jwt:Key"]).Returns("supersecretkey12345678901234567890");
        _mockConfiguration.Setup(config => config["Jwt:Issuer"]).Returns("TestIssuer");
        _mockConfiguration.Setup(config => config["Jwt:Audience"]).Returns("TestAudience");
        _mockConfiguration.Setup(config => config["Jwt:DurationInMinutes"]).Returns("60");

        _authService = new AuthService(_mockConfiguration.Object, _mockAuthValidation.Object, _mockUserRepository.Object);
    }

    [Fact]
    public async Task Login_ShouldReturnAuthModel_WhenCredentialsAreValid()
    {
        var loginModel = new LoginModel { Email = "test@example.com", Password = "password" };
        var passwordHasher = new PasswordHasher<UserEntity>();

        var user = new UserEntity
        {
            Id = Guid.NewGuid(),
            Email = "test@example.com",
            Name = "Test User",
            Password = passwordHasher.HashPassword(null, "password") // Gerando um hash real
        };

        _mockAuthValidation.Setup(v => v.Login(loginModel));
        _mockUserRepository.Setup(repo => repo.GetByEmail(loginModel.Email)).ReturnsAsync(user);

        var result = await _authService.Login(loginModel);

        Assert.NotNull(result);
        Assert.Equal(user.Id, result.Id);
        Assert.Equal(user.Email, result.Email);
        Assert.False(string.IsNullOrEmpty(result.Token));
    }


    [Fact]
    public async Task Login_ShouldThrowAuthenticationException_WhenUserNotFound()
    {
        var loginModel = new LoginModel { Email = "notfound@example.com", Password = "password" };
        _mockUserRepository.Setup(repo => repo.GetByEmail(loginModel.Email)).ReturnsAsync((UserEntity)null);

        await Assert.ThrowsAsync<AuthenticationException>(() => _authService.Login(loginModel));
    }

    [Fact]
    public async Task Login_ShouldThrowAuthenticationException_WhenPasswordIsInvalid()
    {
        var loginModel = new LoginModel { Email = "test@example.com", Password = "wrongpassword" };
        var passwordHasher = new PasswordHasher<UserEntity>();

        var user = new UserEntity
        {
            Id = Guid.NewGuid(),
            Email = "test@example.com",
            Name = "Test User",
            Password = passwordHasher.HashPassword(null, "password") // Gera um hash real da senha correta
        };

        _mockUserRepository.Setup(repo => repo.GetByEmail(loginModel.Email)).ReturnsAsync(user);

        var exception = await Assert.ThrowsAsync<AuthenticationException>(() => _authService.Login(loginModel));

        Assert.Equal("Email or password invalid.", exception.Message);
    }


    [Fact]
    public async Task RefreshToken_ShouldReturnNewToken_WhenUserExists()
    {
        var userId = Guid.NewGuid();
        var user = new UserEntity { Id = userId, Email = "test@example.com", Name = "Test User", Password = "" };
        var refreshTokenModel = new RefreshTokenModel { Id = userId, RefreshToken = "old-refresh-token" };

        _mockUserRepository.Setup(repo => repo.GetByIdAsync(userId)).ReturnsAsync(user);

        var result = await _authService.RefreshToken(refreshTokenModel);

        Assert.NotNull(result);
        Assert.Equal(user.Id, result.Id);
        Assert.Equal(user.Email, result.Email);
        Assert.False(string.IsNullOrEmpty(result.Token));
    }

    [Fact]
    public async Task RefreshToken_ShouldThrowAuthenticationException_WhenUserNotFound()
    {
        var refreshTokenModel = new RefreshTokenModel { Id = Guid.NewGuid(), RefreshToken = "old-refresh-token" };
        _mockUserRepository.Setup(repo => repo.GetByIdAsync(refreshTokenModel.Id)).ReturnsAsync((UserEntity)null);

        await Assert.ThrowsAsync<AuthenticationException>(() => _authService.RefreshToken(refreshTokenModel));
    }
}
