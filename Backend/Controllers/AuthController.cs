using Cytidel.Api.Models.Auth;
using Cytidel.Api.Services.Interface;
using Microsoft.AspNetCore.Mvc;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]

    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var result = await _authService.Login(model);
        return Ok(result);
    }

    [HttpPost("token/refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenModel model)
    {
        var result = await _authService.RefreshToken(model);
        return Ok(result);
    }

}
