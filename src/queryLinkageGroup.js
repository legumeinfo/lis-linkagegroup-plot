/**
 * Query the LinkageGroup and its GeneticMap attributes.
 */
export default function queryLinkageGroup(linkageGroupId, serviceUrl, imjsClient = imjs) {
    return new Promise((resolve, reject) => {
        const query = pathQuery({ linkageGroupId });
	// eslint-disable-next-line
	const service = new imjsClient.Service({ root: serviceUrl });
	service
	    .records(query)
	    .then(data => {
		if (data && data.length) {
                    resolve(data);
		} else {
                    reject('No LinkageGroup data found!');
                }
	    })
	    .catch(reject);
    });
}

const pathQuery = ({ linkageGroupId }) => ({
    from: 'LinkageGroup',
    select: [
        'identifier',
        'length',
        'geneticMap.primaryIdentifier',
        'geneticMap.synopsis'
    ],
    where: [
	{
	    path: 'id',
	    op: '=',
	    value: linkageGroupId
	}
    ]
});
