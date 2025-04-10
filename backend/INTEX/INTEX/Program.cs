using INTEX.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


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

// Add Identity with strong password settings
builder.Services.AddDefaultIdentity<IdentityUser>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 15;
    options.Password.RequiredUniqueChars = 3;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<INTEXContext>();

builder.Services.AddScoped<INTEXInterface, EFINTEX>();

builder.Services.AddCors(options =>
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    }));

builder.Services.AddHttpsRedirection(options =>
{
    options.RedirectStatusCode = StatusCodes.Status308PermanentRedirect;
    options.HttpsPort = 5000;
});

var app = builder.Build();

app.UseCors("AllowLocalhost");

if (!app.Environment.IsDevelopment())
{
    app.UseHsts(); // Adds the Strict-Transport-Security header
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Use(async (context, next) =>
{
    context.Response.Headers.Append("Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; " +
        "img-src 'self' data: https://blobintex.blob.core.windows.net https://cdn.builder.io; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "connect-src 'self' https://localhost:5000 http://localhost:4000 https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net; " +
        "frame-src 'self';"
    );
    await next();
});

app.UseAuthorization();

app.MapControllers();

app.Run();