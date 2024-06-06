using Algoritimos.CasosDdeUso;
using Algoritimos.Models;
using Microsoft.AspNetCore.Mvc;

namespace Algoritimos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ObterResultadoGulosoController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post(List<Cardapio> cardapio)
        {
            var cardapioOutput = ObterResultadoGuloso.Executar(cardapio);
            return Ok(cardapioOutput);
        }
    }
}