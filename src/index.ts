/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { a } from "vitest/dist/suite-ynYMzeLu.js";
export interface Env {
	GITHUB_TOKEN: string;
  }

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = 'https://api.github.com/repos/FOSSBilling/FOSSBilling/actions/artifacts';
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'Method': 'GET',
				'User-agent': 'Nodejs'
			},
		});
		const jsonResponse = await response.json();
		const artifacts = jsonResponse.artifacts;
		let artifact_id = '';
		let run_id = '';
		let archive_download_url = '';
		for (const artifact of artifacts) {
			if (artifact.name == 'FOSSBilling Preview' && artifact.workflow_run.head_branch == "main") {
				console.log(artifact);
				archive_download_url = artifact.archive_download_url;
				artifact_id = artifact.id;
				run_id = artifact.workflow_run.id;
				break;
			}
		}

		console.log(archive_download_url);
		
		return new Response('Hello worker', {	status: 200 });
	},
} satisfies ExportedHandler<Env>;
