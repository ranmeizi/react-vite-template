import React, { useState, useEffect } from 'react'
import * as API from '@/services/System/Role'
import { Select } from 'antd';

const { Option } = Select;

type Props = {
    value?: number[],
    onChange?: (value: number[]) => void,
    roleType: number
}

export default function ({
    value,
    onChange,
    roleType
}: Props) {
    const [list, setList] = useState<LV[]>([])
    useEffect(() => {
        (roleType !== undefined) && getData(roleType)
    }, [roleType])
    async function getData(roleType: number) {
        setList(await API.getRoleNameList(roleType))
    }
    return <Select
        mode="multiple"
        allowClear
        className='w-100'
        placeholder=""
        value={value}
        onChange={onChange}
    >
        {list.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
    </Select>
}
