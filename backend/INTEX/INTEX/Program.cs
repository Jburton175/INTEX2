using INTEX.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// builder.WebHost.ConfigureKestrel(options =>
// {
//     options.ListenLocalhost(4000); // HTTP listener
//     options.ListenLocalhost(5000, listenOptions =>
//     {
//         listenOptions.UseHttps(); // HTTPS listener
//     });
// });


// Add services to the container.


builder.Services.AddControllers(options =>
{
    options.Filters.Add(new Microsoft.AspNetCore.Mvc.RequireHttpsAttribute());
});



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<INTEXContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("IntexConnection")));

// db for authorization
builder.Services.AddDbContext<AuthDBContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("AuthConnection")));

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


//changes for authorization
builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<AuthDBContext>();

var app = builder.Build();

app.UseCors("AllowLocalhost");


if (!app.Environment.IsDevelopment())
{
    app.UseHsts(); // Adds the Strict-Transport-Security header
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapIdentityApi<IdentityUser>();

app.Run();
