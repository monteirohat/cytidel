using Microsoft.AspNetCore.Identity;

public static class PasswordHelper
{
    
    public static string GeneratePasswordHash<TUser>(string plainPassword) where TUser : class, new()
    {
        // Cria uma instância dummy do usuário.
        TUser dummyUser = new TUser();
        
        // Cria o password hasher para o tipo TUser.
        var passwordHasher = new PasswordHasher<TUser>();
        
        // Gera o hash da senha informada.
        return passwordHasher.HashPassword(dummyUser, plainPassword);
    }

    public static string GeneratePasswordHash<TUser>(string plainPassword, TUser dummyUser) where TUser : class
    {
        var passwordHasher = new PasswordHasher<TUser>();
        return passwordHasher.HashPassword(dummyUser, plainPassword);
    }
}
