import React from 'react'
import url from 'url'
import { Minimatch } from 'minimatch'

exports.onRenderBody = (
    { setHeadComponents, pathname = `/` },
    pluginOptions
) => {
    if (pluginOptions && pluginOptions.siteUrl) {
        const parsedUrl = url.parse(pluginOptions.siteUrl)
        const myUrl = `${pluginOptions.siteUrl}${pathname}`
        
        if( pluginOptions.excludedPaths && pluginOptions.excludedPaths.length > 0 &&
            pathname &&
            pluginOptions.excludedPaths.findIndex((_path) =>
                new Minimatch(pathname).match(_path)
            ) > 0){
            return 
        }
        
         setHeadComponents([
                <link
                    rel="canonical"
                    key={myUrl}
                    href={myUrl}
                    data-baseprotocol={parsedUrl.protocol}
                    data-basehost={parsedUrl.host}
                />
         ])
    }
}
