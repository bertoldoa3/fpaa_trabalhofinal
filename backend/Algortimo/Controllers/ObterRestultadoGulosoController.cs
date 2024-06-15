using Algoritimos.CasosDeUso;
using Algoritimos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Algoritimos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ObterResultadoGulosoController : ControllerBase
    {
        private readonly ILogger<ObterResultadoGulosoController> _logger;
        public ObterResultadoGulosoController(ILogger<ObterResultadoGulosoController> logger)
        {
            _logger = logger;
        }
        [HttpPost]
        public IActionResult Post(List<CasosDeUso.Cardapio> cardapio)
        {
            if (cardapio == null)
            {
                _logger.LogError("Recebida uma solicitação com cardápio nulo.");
                return BadRequest("O cardápio não pode ser nulo.");
            }

            if (cardapio.Any(item => item == null))
            {
                _logger.LogError("Recebida uma solicitação com um ou mais itens nulos no cardápio.");
                return BadRequest("Um ou mais itens no cardápio estão nulos.");
            }

            _logger.LogInformation("Recebida uma solicitação com um cardápio válido.");

            var cardapioOutput = ObterResultadoGuloso.Executar(cardapio);
            return Ok(cardapioOutput);
        }
    }
}