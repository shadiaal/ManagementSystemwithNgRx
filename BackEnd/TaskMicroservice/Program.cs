var builder = WebApplication.CreateBuilder(args);

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200/") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
// Use CORS
app.UseCors("AllowAngularApp");
app.UseAuthorization();

app.MapControllers();

app.Run();
