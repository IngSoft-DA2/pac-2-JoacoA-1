using IImporter;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace BackApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReflectionController : ControllerBase
    {
        [HttpGet("importers")]
        public IActionResult GetImporters()
        {
            try
            {
                string basePath = AppContext.BaseDirectory;
                string reflectionPath = Path.Combine(basePath, "reflection");
                Console.WriteLine($"Searching DLLs in: {reflectionPath}");

                if (!Directory.Exists(reflectionPath))
                {
                    return Ok(Array.Empty<string>());
                }

                var dlls = Directory.GetFiles(reflectionPath, "*.dll", SearchOption.TopDirectoryOnly);
                var result = new List<string>();

                foreach (var dll in dlls)
                {
                    try
                    {
                        var assembly = Assembly.LoadFrom(dll);

                        bool hasImporter = assembly.GetTypes().Any(t =>
                            typeof(ImporterInterface).IsAssignableFrom(t) &&
                            t.IsClass && !t.IsAbstract && t.IsPublic
                        );

                        if (hasImporter)
                        {
                            result.Add(Path.GetFileName(dll));
                        }
                    }
                    catch (ReflectionTypeLoadException ex)
                    {
                        var loadedTypes = ex.Types.Where(t => t != null);
                        bool hasImporter = loadedTypes.Any(t =>
                            typeof(ImporterInterface).IsAssignableFrom(t) &&
                            t.IsClass && !t.IsAbstract && t.IsPublic
                        );

                        if (hasImporter)
                        {
                            result.Add(Path.GetFileName(dll));
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error analizando {dll}: {ex.Message}");
                    }
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error procesando reflexión: {ex.Message}");
            }
        }
    }
}
