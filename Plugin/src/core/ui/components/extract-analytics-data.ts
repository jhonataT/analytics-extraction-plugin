
import { GetAnalyticsData } from "../../usecases/get-analytics-data.usecase";

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

const button = document.querySelector<HTMLButtonElement>('#starter');
button?.addEventListener('click', () => {
  expandingBox.classList.toggle('expanded');

  if (expandingBox.classList.contains('expanded')) {
    const fetchAnalyticsData = new GetAnalyticsData();
    const analyticsData = fetchAnalyticsData.execute();

    expandingBox.innerHTML = `
      <div class="info__container">
        <ul>
          <li>
            <span class="title">Dispositivo:</span>
            <span class="subtitle">${analyticsData.device}</span>
          </li>
          <li>
            <span class="title">Sistema Operacional:</span>
            <span class="subtitle">${analyticsData.os}</span>
          </li>
          <li>
            <span class="title">Origem (Domínio):</span>
            <span class="subtitle">${analyticsData.origin}</span>
          </li>
          <li>
            <span class="title">Mudanças de tema:</span>
            <span class="subtitle">${analyticsData.themeChanges}</span>
          </li>
        </ul>
        <button type="button" id="saved-btn" title="Salvar dados">
          Salvar dados
        </button>
      </div>
    `;
  } else {
    expandingBox.innerHTML = '';
  }
});
