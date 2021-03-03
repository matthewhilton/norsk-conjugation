import React, { useState, useEffect } from "react";
import ContextValue from "../interfaces/contextValue"
import Sentence from "../interfaces/sentence";
import Verb from "../interfaces/verb";

const csv=require('csvtojson')
const request=require('request')

const defaultValue: ContextValue = {
    loading: true,
    value: undefined
}

export const DataContext = React.createContext(defaultValue)

export const DataProvider = (props: {children: React.ReactNode}) => {
    const [data, setData] = useState<ContextValue>(defaultValue)

    useEffect(() => {
        // On load get data from CSV files in the public directory
        const verbsCSVPath = window.location.origin.toString() + '/verbs.csv'
        const sentencesCSVPath = window.location.origin.toString() + '/sentences.csv'

        const sentencePromise = new Promise((resolve , reject) => {
            csv({ checkType: true })
            .fromStream(request.get(sentencesCSVPath))
            .then((jsonObj: any)=>{
                resolve(jsonObj as Array<Sentence>)
            })
            .catch((e:any) => reject(e))
        })

        const verbPromise = new Promise((resolve , reject) => {
            csv({ checkType: true })
            .fromStream(request.get(verbsCSVPath))
            .then((jsonObj: any)=>{
                resolve(jsonObj as Array<Verb>)
            })
            .catch((e:any) => reject(e))
        })

        const dataPromises = [sentencePromise, verbPromise]
        
        Promise.all(dataPromises).then((promiseData: any) => { 
            setData({
                loading: false,
                value: {
                    sentences: promiseData[0],
                    verbs: promiseData[1]
                }
            })
        }).catch(e => console.error(e))
    },[])

    return(
        <DataContext.Provider value={data}>
            {props.children}
        </DataContext.Provider>
    )
}