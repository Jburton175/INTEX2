using System.Security.Claims;
using INTEX.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using INTEX.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers(options =>
{ 
    options.Filters.Add(new Microsoft.AspNetCore.Mvc.RequireHttpsAttribute());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "INTEX API", Version = "v1" });

    // Add JWT Bearer definition
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your JWT token in the format: Bearer <your_token>"
    });

    // Require the token for all endpoints that use [Authorize]
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});


builder.Services.AddDbContext<INTEXContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("IntexConnection")));

// Add Identity with strong password settings
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    // Password configuration
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 15;
    options.Password.RequiredUniqueChars = 3;

    // Claims identity settings
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
})
.AddEntityFrameworkStores<AuthDBContext>() // or ApplicationDbContext if that's your main one
.AddDefaultTokenProviders(); // Needed for password resets, email confirmations, etc.



// db for authorization
builder.Services.AddDbContext<AuthDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AuthConnection")));

// Authorization
builder.Services.AddAuthorization();

builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();
builder.Services.AddScoped<INTEXInterface, EFINTEX>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("App", policy =>
    {
        policy.WithOrigins("http://localhost:3000"
                            , "https://localhost:3000"
                            , "https://delightful-bay-0ff08bf1e.6.azurestaticapps.net"
                            , "http://delightful-bay-0ff08bf1e.6.azurestaticapps.net")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services.AddHttpsRedirection(options =>
{
    options.RedirectStatusCode = StatusCodes.Status308PermanentRedirect;
    options.HttpsPort = 5000;
});

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.LoginPath = "/INTEX/login";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();


var app = builder.Build();

// CORS must be before Authentication
app.UseCors("App");

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// CSP Header Middleware
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; " +
        "img-src 'self' data: https://blobintex.blob.core.windows.net https://cdn.builder.io; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "connect-src 'self' https://localhost:5000 http://localhost:4000 https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net; " +
        "frame-src 'self';");

    await next();
});


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapIdentityApi<IdentityUser>();

app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.None
    });

    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();

app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }
    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
    return Results.Json(new { email = email });
}).RequireAuthorization();

app.Run();
