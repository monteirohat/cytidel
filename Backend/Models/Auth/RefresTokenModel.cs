namespace Cytidel.Api.Models.Auth
{
    public class RefreshTokenModel
    {
        public required Guid Id { get; set; }
        public required string RefreshToken { get; set; }

    }
}
