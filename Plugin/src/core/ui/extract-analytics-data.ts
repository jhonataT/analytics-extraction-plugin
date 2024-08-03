import { BrowserAnalyticsRepository } from "../infra/browser/repositories/browser-anaytics.repository";
import { GetAnalyticsData } from "../usecases/get-analytics-data.usecase";
import { changeBtnLabel } from "../utils/changeBtnLabel";

interface ExtractedItem {
  value: 'os' | 'device' | 'origin' | 'themeChanges';
  label: string;
};

const rowsToShow: ExtractedItem[] = [
  { value: 'device', label: 'Dispositivo' },
  { value: 'os', label: 'Sistema Operacional' },
  { value: 'origin', label: 'Origem (Domínio)' },
  { value: 'themeChanges', label: 'Mudanças de tema' },
];

const browserAnalyticsRepository = new BrowserAnalyticsRepository();

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
  if (expandingBox.classList.contains('expanded')) {
    const isValidToken = window.ht?.getIsValidToken();
    changeBtnLabel(startButton, 'Cancelar', 'close_btn');

    if (!isValidToken) {
      const fetchAnalyticsData = new GetAnalyticsData(browserAnalyticsRepository);
      const analyticsData = fetchAnalyticsData.execute();

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
