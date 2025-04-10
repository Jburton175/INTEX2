using System.Security.Claims;
using INTEX.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using INTEX.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers(options =>
{
    options.Filters.Add(new Microsoft.AspNetCore.Mvc.RequireHttpsAttribute());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<INTEXContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("IntexConnection")));

// db for authorization
builder.Services.AddDbContext<AuthDBContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("AuthConnection")));

//changes for authorization
builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<AuthDBContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email; // Ensure email is stored in claims
});

builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();


builder.Services.AddScoped<INTEXInterface, EFINTEX>();

builder.Services.AddCors(options =>
    options.AddPolicy("App", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://delightful-bay-0ff08bf1e.6.azurestaticapps.net")
              .AllowCredentials() // allows cookies
              .AllowAnyMethod()
              .AllowAnyHeader();
    }));

builder.Services.AddHttpsRedirection(options =>
{
    options.RedirectStatusCode = StatusCodes.Status308PermanentRedirect;
    options.HttpsPort = 5000;
});



var app = builder.Build();

app.UseCors("App");

if (!app.Environment.IsDevelopment())
{
    app.UseHsts(); // Adds the Strict-Transport-Security header
}

// Swagger only in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ✅ CSP Headers Middleware
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; " +
        "img-src 'self' data: https://blobintex.blob.core.windows.net https://cdn.builder.io;" +
        "font-src 'self' https://fonts.gstatic.com; " +
        "connect-src 'self' https://localhost:5000 http://localhost:4000 https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net; " +
        "frame-src 'self';"
    );
    await next();
});

app.UseAuthorization();

app.MapControllers();


app.MapIdentityApi<IdentityUser>();

app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();

    // Ensure authentication cookie is removed
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application");
    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();


app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }
    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com"; // Ensure it's never null
    return Results.Json(new { email = email }); // Return as JSON
}).RequireAuthorization();


app.Run();
