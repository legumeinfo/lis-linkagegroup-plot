/**
 * Return a ChartXpress data object for the linkage group plot.
 */
export default function getData(linkageGroup, markers, qtls) {
    if (!linkageGroup) return null;
        
    const tracks = [];
    
    if (linkageGroup) {
        const lgTrack = {
            "type": "box",
            "data": [
                {
                    "key": linkageGroup.objectId,
                    "fill": "purple",
                    "id": linkageGroup.identifier,
                    "data": [
                        [
                            0,
                            linkageGroup.length
                        ]
                    ],
                    "outline": "black"
                }
            ]
        };
        tracks.push(lgTrack);
    }
        
    //  { "objectId": 91000015, "markerName": "BMd14", "class": "LinkageGroupPosition", "position": 0, "linkageGroup": { "objectId": 91000005, "class": "LinkageGroup" } }
    if (markers) {
        const markerData = [];
        markers.forEach(marker => {
            markerData.push({
                "fill": "darkred",
                "id": marker.markerName,
                "offset": marker.position,
                "outline": "black"
            });
        });
        const markerTrack = {
            "type": "triangle",
            "data": markerData
        };
        tracks.push(markerTrack);
    }
    
    //  { "objectId": 101000005, "class": "QTL", "end": 50, "start": 42, "identifier": "Int2" }
    if (qtls) {
        const qtlData = [];
        qtls.forEach(qtl => {
            qtlData.push({
                "key": qtl.objectId,
                "fill": "yellow",
                "id": qtl.identifier,
                "data": [
                    [
                        qtl.start,
                        qtl.end
                    ]
                ],
                "outline": "black"
            });
        });
        const qtlTrack = {
            "type": "box",
            "data": qtlData
        };
        tracks.push(qtlTrack);
    }
            
    return { tracks: tracks };

}
