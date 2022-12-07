/**
 * Query the QTLs for a given LinkageGroup.
 */
export default function queryQTLs(linkageGroupId, serviceUrl, imjsClient = imjs) {
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
                    reject('No LinkageGroup QTL data found!');
                }
	    })
	    .catch(reject);
    });
}

const pathQuery = ({ linkageGroupId }) => ({
    from: 'LinkageGroup',
    select: [
        'qtls.identifier',
        'qtls.start',
        'qtls.end'
    ],
    orderBy: [
        {
            path: 'qtls.start',
            direction: 'ASC'
        }
    ],
    where: [
	{
	    path: 'id',
	    op: '=',
	    value: linkageGroupId
	}
    ]
});
