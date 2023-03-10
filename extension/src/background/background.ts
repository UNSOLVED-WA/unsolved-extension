import API, { NoContentError, ServerSideError } from '../api/api';
import { StorageManager } from '../utils';
import { STORAGE_VALUE, Request, SendResponse, SolvedUser } from '../@types';
import { tiers } from '../contentScript/util';

function fetchCachedData(_: Error, key: keyof STORAGE_VALUE) {
  return StorageManager.get(key);
}

function fetchRanking(sendResponse: SendResponse<'fetchRanking'>) {
  StorageManager.get('selectedOrganization', (selectedOrganization) => {
    API.RankingService.getAllRanking(selectedOrganization)
      .then((rankings) => {
        sendResponse({ state: 'success', responseData: { rankings } });
      })
      .catch((error) => {
        sendResponse({ state: 'fail', errorMessage: error.message });
      });
  });
}

function fetchRecommands(sendResponse: SendResponse<'fetchRecommands'>, tier: number) {
  StorageManager.get('selectedOrganization', (selectedOrganization) => {
    API.ProblemService.getUnsolvedProblems(selectedOrganization, tier)
      .then((problems) => {
        sendResponse({ state: 'success', responseData: { problems } });
      })
      .catch((error) => {
        sendResponse({ state: 'fail', errorMessage: error.message });
      });
  });
}

function fetchRandomRecommand(sendResponse: SendResponse<'fetchRandomRecommand'>) {
  const tier = tiers[Math.floor(Math.random() * tiers.length)].toString();
  StorageManager.get('selectedOrganization', (selectedOrganization) => {
    API.ProblemService.getRecommandUnsolvedProblem(selectedOrganization, tier)
      .then((problems) => {
        sendResponse({ state: 'success', responseData: { problems } });
      })
      .catch((error) => {
        let fallback: string;
        if (error instanceof NoContentError) {
          fallback = 'info';
        } else {
          fallback = 'error';
        }
        sendResponse({ state: 'fail', errorMessage: error.message, fallback });
      });
  });
}

function fetchUser(sendResponse: SendResponse<'fetchUser'>) {
  API.ExternalService.getSolvedUsers()
    .then((data) => {
      StorageManager.get('selectedOrganization', (selectedOrganization) => {
        if (selectedOrganization === '' && data.user.organizations.length > 0) {
          selectedOrganization = data.user.organizations[0].name;
          StorageManager.set('selectedOrganization', selectedOrganization);
        }
        StorageManager.set('solvedUser', data, (solvedUser) => {
          sendResponse({ state: 'success', responseData: { solvedUser, selectedOrganization } });
        });
      });
    })
    .catch(async (error) => {
      try {
        const data = (await fetchCachedData(error, 'solvedUser')) as SolvedUser;
        sendResponse({ state: 'cached', responseData: { solvedUser: data, selectedOrganization: data.user.organizations[0].name } });
      } catch {
        sendResponse({ state: 'fail', errorMessage: error.message });
      }
    });
}

function fetchTeam(sendResponse: SendResponse<'fetchTeam'>) {
  StorageManager.get('selectedOrganization', (selectedOrganization) => {
    API.TeamService.getTeamByTeamName(selectedOrganization)
      .then((team) => {
        sendResponse({ state: 'success', responseData: { team } });
      })
      .catch((error) => {
        sendResponse({ state: 'fail', errorMessage: error.message });
      });
  });
}

function fetchBadge(sendResponse: SendResponse<'fetchBadge'>) {
  StorageManager.get('solvedUser', (result) => {
    API.ExternalService.getBojBadge(result.user.handle)
      .then((badge) => {
        StorageManager.set('badge', badge, () => {
          sendResponse({ state: 'success', responseData: { badge } });
        });
      })
      .catch(async (error) => {
        try {
          const badge = (await fetchCachedData(error, 'badge')) as string;
          sendResponse({ state: 'cached', responseData: { badge } });
        } catch {
          sendResponse({ state: 'fail', errorMessage: error.message });
        }
      });
  });
}

function createUnsolvedUser(sendResponse: SendResponse<'createUnsolvedUser'>) {
  StorageManager.get('solvedUser', (solvedUser) => {
    API.UserService.createUnsolvedUser(
      solvedUser.user.handle,
      solvedUser.user.organizations.map((organization) => organization.organizationId),
      solvedUser.solved
    )
      .then((data) => {
        sendResponse({ state: 'success', responseData: { unsolvedUser: data } });
      })
      .catch((error) => {
        sendResponse({ state: 'fail', errorMessage: solvedUser.user.handle + error.message });
      });
  });
}

function fetchUnsolvedUser(sendResponse: SendResponse<'fetchUnsolvedUser'>) {
  StorageManager.get('solvedUser', (result) => {
    API.UserService.fetchUnsolvedUser(result.user.handle)
      .then((data) => {
        sendResponse({ state: 'success', responseData: { unsolvedUser: data } });
      })
      .catch((error) => {
        sendResponse({ state: 'fail', errorMessage: error.message });
      });
  });
}

function asyncRequest(request: Request, sendResponse: SendResponse) {
  switch (request.message) {
    case 'fetchUser':
      fetchUser(sendResponse);
      break;
    case 'fetchUnsolvedUser':
      fetchUnsolvedUser(sendResponse);
      break;
    case 'createUnsolvedUser':
      createUnsolvedUser(sendResponse);
      break;
    case 'fetchTeam':
      fetchTeam(sendResponse);
      break;
    case 'fetchBadge':
      fetchBadge(sendResponse);
      break;
    case 'fetchRanking':
      fetchRanking(sendResponse);
      break;
    case 'fetchRecommands':
      fetchRecommands(sendResponse, request.requestData.tier);
      break;
    case 'fetchRandomRecommand':
      fetchRandomRecommand(sendResponse);
      break;
    case 'selectedOrganization':
      StorageManager.set('selectedOrganization', request.requestData.selectedOrganization, (selectedOrganization) => {
        sendResponse({ state: 'success', responseData: { selectedOrganization } });
      });
      break;
    case 'useCommandsToggleVisible':
      StorageManager.get('commands', (commands) => {
        if (request.requestData?.toggle) {
          StorageManager.set('commands', { ...commands, toggle_visible: !commands.toggle_visible }, ({ toggle_visible }) => {
            sendResponse({ state: 'success', responseData: { isUseCommandsToggleVisible: toggle_visible } });
          });
        } else {
          sendResponse({ state: 'success', responseData: { isUseCommandsToggleVisible: commands.toggle_visible } });
        }
      });
      break;
    case 'autoScoring':
      StorageManager.get('autoScoring', (isAutoScoring) => {
        if (request.requestData?.toggle) {
          StorageManager.set('autoScoring', !isAutoScoring, (isAutoScoring) => {
            sendResponse({ state: 'success', responseData: { isAutoScoring } });
          });
        } else {
          sendResponse({ state: 'success', responseData: { isAutoScoring } });
        }
      });
      break;
    case 'hideButton':
      StorageManager.get('hideButton', (isHide) => {
        if (request.requestData?.toggle) {
          StorageManager.set('hideButton', !isHide, (isHide) => {
            sendResponse({ state: 'success', responseData: { isHide } });
          });
        } else {
          sendResponse({ state: 'success', responseData: { isHide } });
        }
      });
      break;
  }
}

function syncRequest(request: Request) {
  switch (request.message) {
    case 'toLogin':
      chrome.tabs.create({
        url: 'https://solved.ac/',
      });
      break;
    case 'toAddOrganization':
      chrome.tabs.create({
        url: 'https://www.acmicpc.net/setting/school',
      });
      break;
    case 'sendNotification':
      chrome.notifications.create('helloworld', {
        type: 'basic',
        title: 'Unsolved.WA',
        message: '문제풀 시간입니다.',
        iconUrl: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008394/noticon/ohybolu4ensol1gzqas1.png',
      });
      break;
    case 'toRedirectProblem':
      chrome.tabs.create({
        url: `https://www.acmicpc.net/problem/${request.requestData.problemId}`,
      });
      break;
    case 'toRedirectUser':
      chrome.tabs.create({
        url: `https://www.acmicpc.net/user/${request.requestData.bojId}`,
      });
      break;
    case 'showGuide':
      chrome.tabs.create({
        url: 'https://github.com/UNSOLVED-WA/unsolved-extension/blob/main/GUIDE.md',
      });
      break;
    case 'RUNNING':
      StorageManager.set('scoring', { state: 'RUNNING' });
      break;
    case 'WRONG':
      StorageManager.set('scoring', { state: 'WRONG' });
      break;
    case 'TIMEOUT':
      StorageManager.set('scoring', { state: 'TIMEOUT' });
      break;
    case 'CORRECT':
      StorageManager.get('solvedUser', async (solvedUser) => {
        // TODO : <high> 'user2' -> solvedUser.user.handle
        API.ProblemService.updateUnsolvedProblems(solvedUser.user.handle, parseInt(request.requestData.problemId))
          .then((result) => {
            StorageManager.set('scoring', { state: 'CORRECT', score: result[0] ? result[0].score : 0 });
          })
          .catch((error) => {
            StorageManager.set('scoring', { state: 'NETERROR', problemId: request.requestData.problemId, score: -1 });
          });
      });
      break;
    case 'OpenGuide':
      chrome.tabs.create({
        url: 'https://github.com/UNSOLVED-WA/unsolved-extension',
      });
  }
}

chrome.runtime.onMessage.addListener((request: Request, _, sendResponse: SendResponse) => {
  if (request.type === 'async') {
    asyncRequest(request, sendResponse);
    return true;
  }
  syncRequest(request);
});

chrome.runtime.onInstalled.addListener(() => {
  StorageManager.sets({
    hideButton: false,
    isClicked: false,
    autoScoring: true,
    selectedOrganization: '',
    scoring: {
      problemId: '',
      state: 'DEFAULT',
      score: -1,
    },
    selectedTiers: [1],
    commands: {
      toggle_visible: true,
    },
  });
});

chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case 'toggle-visible':
      StorageManager.gets(['hideButton', 'commands'], ({ hideButton, commands }) => {
        if (commands.toggle_visible) StorageManager.set('hideButton', !hideButton);
      });
      break;
    default:
      break;
  }
});
