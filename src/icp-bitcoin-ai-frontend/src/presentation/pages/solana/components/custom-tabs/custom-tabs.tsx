import React from 'react'
import styles from './custom-tabs-styles.module.scss'
import { Box, Tab, Tabs } from '@mui/material'
import { TabContext, TabPanel } from '@mui/lab'
import { TokenChart } from '../token-chart/token-chart'
import AmmTable from '../amm-table/amm-table'

type Props = {
  labels: string[]
  hashblocks: any
  table?: boolean
}

const CustomTabs: React.FC<Props> = ({ labels, hashblocks, table }: Props) => {
  const [value, setValue] = React.useState('0')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <div className={styles.tabs}>
      <TabContext value={value}>
        <Box className={styles.box} sx={{ display: 'flex', height: '60px', padding: '8px', borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            sx={{ marginBottom: '4px' }}
            value={value}
            onChange={handleChange}
            aria-label="chart tabs"
          >
            {labels.map((label: string, index: number) => {
              return <Tab autoCapitalize='false' className={styles.tab} label={label} value={index.toString()} key={`tab - ${index}`} />
            })}
          </Tabs>
        </Box>

        <TabPanel className={styles.panel} sx={{ display: value === '0' ? 'flex' : 'none', width: '100%', height: '100%' }} value='0' key={`panel - 0`}>
          <TokenChart />
        </TabPanel>

        <TabPanel className={styles.panel} sx={{ display: value === '1' ? 'flex' : 'none', width: '100%', height: '100%' }} value='1' key={`panel - 1`}>
          <TokenChart />
        </TabPanel>

        <TabPanel className={styles.panel} sx={{ display: value === '2' ? 'flex' : 'none', width: '100%', height: '100%' }} value='2' key={`panel - 2`}>
          <TokenChart />
        </TabPanel>

        <TabPanel className={styles.panel} sx={{ display: value === '3' ? 'flex' : 'none', width: '100%', height: '100%' }} value='3' key={`panel - 3`}>
          <TokenChart />
        </TabPanel>
        <TabPanel className={styles.panel} sx={{ display: value === '4' ? 'flex' : 'none', width: '100%', height: '100%' }} value='4' key={`panel - 4`}>
          <TokenChart />
        </TabPanel>

        <TabPanel className={styles.panel} sx={{ display: value === '5' ? 'flex' : 'none', width: '100%', height: '100%' }} value='5' key={`panel - 5`}>
          <TokenChart />
        </TabPanel>
        {/* <TabPanel className={styles.panel} sx={{ display: value === '1' ? 'flex' : 'none', width: '100%', height: '100%' }} value='1' key={`panel - 1`}>
          <TimeTransactionsChart data={hashblocks && hashblocks} />
        </TabPanel> */}
        {/* {
          labels.map((panel: any, index: number) => {
            return <TabPanel className={styles.panel} sx={{ display: index.toString() === value ? 'flex' : 'none', width: '100%', height: '100%' }} value={index.toString()} key={`panel - ${index}`}>
              {panel && <HashblockTransactionsChart />}
            </TabPanel>
          })
        } */}
      </TabContext>

      {
        table && <AmmTable title='Top AMMs by Volume' />
      }
    </div >
  )
}

export default CustomTabs