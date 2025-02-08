namespace Cytidel.Api.Models.Auth
{
    public class AuthModel
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Token { get; set; }
        public required string RefreshToken { get; set; }

    }
}
