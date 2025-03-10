import { Octokit } from 'octokit';

// Initialize Octokit with a personal access token
export const getOctokit = (token: string) => {
  return new Octokit({ auth: token });
};

// Function to fetch GitHub Actions workflows for a repository
export async function fetchWorkflows(
  token: string,
  owner: string,
  repo: string
) {
  const octokit = getOctokit(token);
  
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/actions/workflows', {
      owner,
      repo,
    });
    
    return response.data.workflows;
  } catch (error) {
    console.error('Error fetching workflows:', error);
    throw error;
  }
}

// Function to fetch recent workflow runs
export async function fetchWorkflowRuns(
  token: string,
  owner: string,
  repo: string,
  per_page = 10
) {
  const octokit = getOctokit(token);
  
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/actions/runs', {
      owner,
      repo,
      per_page,
    });
    
    return response.data.workflow_runs;
  } catch (error) {
    console.error('Error fetching workflow runs:', error);
    throw error;
  }
}

// Function to fetch all repositories for an organization
export async function fetchOrgRepos(
  token: string,
  org: string,
  per_page = 100
) {
  const octokit = getOctokit(token);
  
  try {
    const response = await octokit.request('GET /orgs/{org}/repos', {
      org,
      per_page,
      sort: 'updated',
      direction: 'desc',
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching organization repositories:', error);
    throw error;
  }
} 