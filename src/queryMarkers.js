/**
 * Query the markers for a given LinkageGroup.
 */
export default function queryMarkers(linkageGroupId, serviceUrl, imjsClient = imjs) {
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
                    reject('No LinkageGroup marker data found!');
                }
	    })
	    .catch(reject);
    });
}

const pathQuery = ({ linkageGroupId }) => ({
    from: 'LinkageGroupPosition',
    select: [
        'markerName',
        'position',
        'linkageGroup.id'
    ],
    orderBy: [
        {
            path: 'position',
            direction: 'ASC'
        }
    ],
    where: [
	{
	    path: 'linkageGroup.id',
	    op: '=',
	    value: linkageGroupId
	}
    ]
});
