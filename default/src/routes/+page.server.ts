import { data } from '$lib/data.generated';
import { markdownToHtml } from '$lib/markdown';
import { buildSchema } from 'graphql';

export async function load() {
	const schema = buildSchema(data.schema);
	const queryType = schema.getQueryType();
	const mutationType = schema.getMutationType();
	const subscriptionType = schema.getSubscriptionType();
	return {
		...data,
		descriptionHtml: await markdownToHtml(data.config.description, data.items, {
			downlevelHeadings: false
		}),
		queryTypeDescriptionHtml: queryType?.description?.trim()
			? await markdownToHtml(queryType.description, data.items, {
					downlevelHeadings: true
				})
			: '',
		mutationTypeDescriptionHtml: mutationType?.description?.trim()
			? await markdownToHtml(mutationType.description, data.items, {
					downlevelHeadings: true
				})
			: '',
		subscriptionTypeDescriptionHtml: subscriptionType?.description?.trim()
			? await markdownToHtml(subscriptionType.description, data.items, {
					downlevelHeadings: true
				})
			: ''
	};
}
