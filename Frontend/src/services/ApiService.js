const BASE_URL = "http://localhost:30400";

/**
 * Constrói os headers da requisição, incluindo os tokens necessários para autenticação.
 *
 * @returns {Object} - Objeto com os cabeçalhos da requisição
 */
function buildHeaders(includeTokens = true) {
  // Cabeçalho padrão
  const headers = {
    "Content-Type": "application/json",
  };

  if (!includeTokens) {
    // Se não queremos incluir tokens, retornamos somente o cabeçalho básico
    return headers;
  }

  // Nomes das chaves de token
  let nameAccessToken = "st-access-token";
  let nameRefreshToken = "st-refresh-token";
  let nameFrontToken = "front-token";

  // Recupera do localStorage ou sessionStorage
  const accessToken =
    localStorage.getItem(nameAccessToken) ||
    sessionStorage.getItem(nameAccessToken);
  const refreshToken =
    localStorage.getItem(nameRefreshToken) ||
    sessionStorage.getItem(nameRefreshToken);
  const frontToken =
    localStorage.getItem(nameFrontToken) ||
    sessionStorage.getItem(nameFrontToken);

  // Monta os headers, se existirem tokens
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  if (refreshToken) {
    headers["st-refresh-token"] = refreshToken;
  }
  if (frontToken) {
    headers["front-token"] = frontToken;
  }

  return headers;
}

/**
 * Faz uma requisição HTTP genérica usando fetch, buscando a rota a partir de um dicionário.
 *
 * @param {Object} params
 * @param {string} params.endpointKey - Chave do endpoint (ex: 'USERS', 'PRODUCTS', etc.)
 * @param {string} [params.method='GET'] - Verbo HTTP (GET, POST, PUT, DELETE, etc.)
 * @param {Object} [params.urlParams={}] - Objeto contendo parâmetros de query string
 * @param {Object|null} [params.body=null] - Objeto para o corpo da requisição (caso necessário)
 * @returns {Promise<any>} - Retorna a resposta da requisição em formato JSON
 */
export async function request({
  endpoint,
  method = "GET",
  urlParams = {},
  body = null,
  includeTokens = true,
}) {
  try {
    const queryString = new URLSearchParams(urlParams).toString();
    const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;

    const options = {
      method,
      headers: buildHeaders(includeTokens),
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      await handleResponseError(response);
    }

    return await response;
  } catch (error) {
    console.error("[request] Erro:", error);
    throw error;
  }
}

/**
 * Helper para construir endpoints dinâmicos (ex.: com {id} ou {cpf})
 *
 * @param {string} endpoint - O endpoint base (ex.: '/users/{cpf}')
 * @param {Object} params - Objeto com os valores para substituir as variáveis (ex.: { cpf: '12345678900' })
 * @returns {string} - Endpoint com as variáveis substituídas.
 */
export function buildRouteWithParams(endpoint, params) {
  let resolvedEndpoint = endpoint;

  Object.entries(params).forEach(([key, value]) => {
    resolvedEndpoint = resolvedEndpoint.replace(`{${key}}`, value);
  });

  return resolvedEndpoint;
}

/**
 * Trata erros de resposta com base no status.
 *
 * @param {Response} response - Objeto Response da API
 */
async function handleResponseError(response) {
  const errorText = await response.json(); // Lê o corpo da resposta

  switch (response.status) {
    case 400:
      console.error(
        "Houve um erro na requisição. Verifique os dados enviados."
      );
      break;
    case 401:
      if (errorText.message === "unauthorised") {
        errorText.message = "Usuário não autenticado.";
      }
      if(errorText.message === "try refresh token"){
        //realiza o refresh do token
      };
      console.error(
        "Você não está autenticado. Por favor, faça login novamente."
      );
      break;
    case 403:
      console.error("Você não tem permissão para acessar este recurso.");
      break;
    case 404:
      console.error("O recurso solicitado não foi encontrado.");
      break;
    case 500:
      console.error("Erro interno do servidor. Tente novamente mais tarde.");
      break;
    default:
      console.error(
        "Um erro desconhecido ocorreu. Por favor, tente novamente."
      );
  }

  // Lança o erro para quem chamou (se necessário),
  // mas deve enviar ao SeqLog em breve
  throw new Error(`${errorText.message}`);
}

