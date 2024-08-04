import { BrowserAnalyticsRepository } from "../infra/browser/repositories/browser-anaytics.repository";
import { AnalyticsDataRepository } from "../repositories/analytics-data.repository";
import { GetAnalyticsData } from "../usecases/get-analytics-data.usecase";
import { SaveAnalyticsData } from "../usecases/save-analytics-data.usecase";
import { changeBtnLabel } from "../utils/changeBtnLabel";

// Applied Singleton Pattern: by @jhonataT
// Applied Dependency Injection pattern: by @jhonataT

const browserAnalyticsRepository = BrowserAnalyticsRepository.init();

interface ExtractedItem {
  value: 'os' | 'device' | 'sourceDomainUrl' | 'themeChangeCount';
  label: string;
};

const rowsToShow: ExtractedItem[] = [
  { value: 'device', label: 'Dispositivo' },
  { value: 'os', label: 'Sistema Operacional' },
  { value: 'sourceDomainUrl', label: 'Origem (Domínio)' },
  { value: 'themeChangeCount', label: 'Mudanças de tema' },
];

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button__container');

buttonContainer.innerHTML = `
  <button type="button" id="starter">
    Extrair Dados
  </button>
`;

document.body.appendChild(buttonContainer);

const expandingBox = document.createElement('div');
expandingBox.classList.add('expanding-box');
document.body.appendChild(expandingBox);

const startButton = document.querySelector<HTMLButtonElement>('#starter');

startButton?.addEventListener('click', () => {
  expandingBox.classList.toggle('expanded');
  
  const analyticsDataRepository = AnalyticsDataRepository.init();
  const fetchAnalyticsData = GetAnalyticsData.init(browserAnalyticsRepository);
  const analyticsData = fetchAnalyticsData.execute();

  if (expandingBox.classList.contains('expanded')) {
    const isValidToken = window.ht?.getIsValidToken();
    changeBtnLabel(startButton, 'Cancelar', 'close_btn');

    if (isValidToken) {
      expandingBox.innerHTML = `
        <div class="info__container">
          <h3>Dados que foram extraídos:</h3>
          <ul>
           ${rowsToShow.map(row => `
              <li>
                <span class="title">${row.label}:</span>
                <span class="subtitle">${analyticsData[row.value]}</span>
              </li>
            `).join('')
           }
          </ul>
          <button type="button" id="saved-btn" title="Salvar dados">
            Salvar dados
          </button>
        </div>
      `;

      const saveBtnElement = document.querySelector<HTMLButtonElement>('#saved-btn');
      saveBtnElement?.addEventListener('click', async () => {
        expandingBox.innerHTML = `
          <div class="info__container error">
            <h3>Salvando os dados extraídos...</h3>
          </div>
        `;
  
        const saveAnalyticsDataService = SaveAnalyticsData.init(analyticsDataRepository, analyticsData);
        const response = await saveAnalyticsDataService.execute();

        let responseMessage = "Dados salvos com sucesso.";

        if(response.error && response.error === 'Too many requests for token') {
          responseMessage = "Você atingiu o seu limite de requisições. Tente novamente mais tarde."
        } else if(response.error) {
          responseMessage = "Erro ao salvar os dados. Tente novamente!"
        }

        expandingBox.innerHTML = `
          <div class="info__container error">
            <h3>${responseMessage}</h3>
          </div>
        `;

        changeBtnLabel(startButton, 'Fechar', 'close_btn');
      });
    } else {
      expandingBox.innerHTML = `
        <div class="info__container error">
          <h3>O token é inválido. Por favor, verifique a validade do token.</h3>
        </div>
      `;
    }
  } else {
    expandingBox.innerHTML = '';
    changeBtnLabel(startButton, 'Extrair Dados', undefined, 'close_btn');
  }
});
