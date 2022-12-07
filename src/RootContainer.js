import React from 'react';
import { useState, useEffect } from 'react';
import Loader from './common/loader';
import CanvasXpressReact from 'canvasxpress-react';

import queryLinkageGroup from "./queryLinkageGroup";
import queryQTLs from "./queryQTLs";
import queryMarkers from "./queryMarkers";
import getData from "./getData";

export default function RootContainer({ serviceUrl, entity, config }) {
    const linkageGroupId = entity.value;
    const [error, setError] = useState(null);
    const [linkageGroup, setLinkageGroup] = useState(null);
    const [markers, setMarkers] = useState(null);
    const [qtls, setQtls] = useState(null);
    const [data, setData] = useState(null);
    
    // query LinkageGroup and GeneticMap attributes
    useEffect(() => {
        queryLinkageGroup(linkageGroupId, serviceUrl)
            .then(response => {
                response.forEach(result => {
                    setLinkageGroup(result);
                });
            })
            .catch(() => {
                setError("LinkageGroup data not found for id="+linkageGroupId);
            });
    }, []);
    
    // query LinkageGroup markers
    useEffect(() => {
        queryMarkers(linkageGroupId, serviceUrl)
            .then(response => {
                const markers = [];
                response.forEach(result => {
                    markers.push(result);
                });
                setMarkers(markers);
            })
            .catch(() => {
                setError("Markers not found for linkage group id="+linkageGroupId);
            });
    }, []);

    // query LinkageGroup QTLs
    useEffect(() => {
        queryQTLs(linkageGroupId, serviceUrl)
            .then(response => {
                const qtls = [];
                response.forEach(result => {
                    result.qtls.forEach(qtl => {
                        qtls.push(qtl);
                    });
                });
                setQtls(qtls);
            })
            .catch(() => {
                setError("QTLs not found for linkage group id="+linkageGroupId);
            });
    }, []);

    // build the CanvasXpress data (there may be no QTLs)
    useEffect(() => {
        setData(getData(linkageGroup, markers, qtls));
    }, [linkageGroup, markers, qtls]);
    
    if (error) return (
            <div className="rootContainer error">{ error }</div>
    );

    // (mostly) static canvasXpress config
    const conf = {
        "graphType": "Genome",
        "backgroundType": "solid",
        "showShadow": false,
        "featureStaggered": true,
        "background": "white",
        "fontName": "Arial",
        "featureNameFontSize": 10,
        "featureNameFontColor": "darkgreen",
        "featureHeightDefault": 5,
        "xAxisTickColor": "black",
        "wireColor": "darkgray",
        "setMinX": 0,
        "xAxisExact": false
    }

    if (linkageGroup) {
        conf["setMaxX"] = linkageGroup.length;
    }

    // QTL click opens a new QTL report page
    // window.location.href: http://domain.org/beanmine/report/LinkageGroup/29000003
    // QTL page:             http://domain.org/beanmine/report/QTL/7900003
    var evts = {
        "click": function(o, e, t) {
            const qtlId = o[0].data[0].key;
            if (qtlId) {
                const uriParts = window.location.href.split("LinkageGroup");
                window.open(uriParts[0]+"QTL/"+qtlId);
            }
        }
    }
    
    return (
        <div>
            {data
             ?
             <div className="rootContainer">
                 <CanvasXpressReact target={"canvas"} data={data} config={conf} height={500} width={1150} events={evts} />
                 <div className="instructions">Click QTL to see its page.</div>
             </div>
             :
             <Loader />
            }
        </div>
    );

}
