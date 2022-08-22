import React from 'react'
import Page from '@/components/Page'
import storeQk from '@/storeQk/store'
import './style.less'

export default function () {
    console.log(storeQk.getGlobalState('user'));
    return <Page>
        <div id='qiankun'></div>
    </Page>
}
