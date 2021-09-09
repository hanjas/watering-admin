import React, { useEffect, useState } from 'react'
import moment from 'moment';

function Popup({ cancel }) {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen backdrop-filter backdrop-blur-sm 
            flex justify-center items-center px-5 bg-gray-400 bg-opacity-20">
            <div className="w-screen bg-white p-3">

                <div className="flex bg-gray-800 bg-opacity-30 p-2 mb-2">
                    <div className="flex-1">Starttime</div>
                    <input type="date" />
                </div>

                <div className="flex bg-gray-800 bg-opacity-30 p-2 mb-2">
                    <div className="flex-1">Endtime</div>
                    <input type="date" />
                </div>

                <div className="flex bg-gray-800 bg-opacity-30 p-2 mb-8">
                    <div className="flex-1">Relay</div>
                    <input type="text" list="relay" />
                        <datalist id="relay">
                            <option value={1}/>
                            <option value={2} />
                        </datalist>
                </div>

                <div className="flex justify-around">
                    <button className="w-24 h-10 bg-red-400 bg-opacity-90 text-white rounded-xl" onClick={cancel}>Cancel</button>
                    <button className="w-24 h-10 bg-blue-400 bg-opacity-90 text-white rounded-xl" onClick={cancel}>Ok</button>
                </div>

            </div>
        </div>
    )
}

function ConfigList({ config, deleteConfig }) {
    
    return (
        <div key={config.configid} className="bg-blue-50 p-2 mb-1.5 rounded flex">
            <div className="rounded-full bg-blue-500 text-white w-8 h-8 flex justify-center items-center mr-2">R{config.relay}</div>
            <div className="flex flex-1 items-center">
                <div className="mr-1">{moment(config.starttime).format('h:mm a')} -</div>
                <div className="mr-1">{moment(config.endtime).format('h:mm a')}</div>
            </div>
            <button className="mr-2 bg-blue-400 text-white rounded w-12" >edit</button>
            <button className="bg-red-400 text-white rounded w-14" onClick={() => {deleteConfig(config.configid)}}>delete</button>
        </div>
    )
}

export default function Main() {

    const [configs, setConfigs] = useState([]);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        fetch("https://roshanhanjas.in/naturespace/api/wateringconfig").then(
            async (rsp) => {
              const data = await rsp.json();
              setConfigs(data.data);
            }
          );
    }, []);

    function deleteConfig(configid) {
        fetch('https://roshanhanjas.in/naturespace/api/wateringconfig/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({configid})
        });
        setConfigs(configs.filter(item => item.configid !== configid));
    }

    function cancel() {
        setPopup(false);
    }

    return (
        <div className="flex flex-col bg-blue-500 h-screen">
            <div className="header h-44 flex justify-center items-center text-white">Admin app</div>
            <div className="bg-indigo-100 flex-1 rounded-t-3xl p-3 h-44 overflow-auto ">
                {configs && configs.map((config, i) => (
                    <ConfigList key={i} config={config} deleteConfig={deleteConfig} />
                ))}
            </div>
            <button className="fixed bottom-6 right-6 rounded-full bg-blue-500 w-12 h-12 text-3xl text-white" onClick={() => setPopup(true)}>+</button>
            {popup && <Popup cancel={cancel} />}
        </div>
    )
}
