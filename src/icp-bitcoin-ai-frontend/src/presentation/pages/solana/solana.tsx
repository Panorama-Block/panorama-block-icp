import React, { useEffect, useState } from 'react'
import styles from './solana-styles.module.scss'
import Sidebar from '../../components/sidebar/sidebar'
import Hashblocks, { HashblockProps } from '../../components/hashblocks/hashblocks'
import Network, { NetworkData } from './components/network/network'
import CustomTabs from './components/custom-tabs/custom-tabs'
import IcpService from '../../../data/services/icp-service'
import { jsonParseBigint } from '../../../utils/json-parse-bigint'
import Header from '../../components/header/header'
import InfoModal from '../../components/info-modal/info-modal'
import AddressInfo from './components/address-info/address-info'
import HashblockInfo from './components/hashblock-info/hashblock-info'
import { Tooltip } from '@mui/material'
import OpenChat from '../../components/open-chat/open-chat'
import WhaleHunting from '../../components/whale-hunting/whale-hunting'
import { hoursInterval, minutesInterval } from '../../../utils/time'
import { compareTimestampDesc } from '../../../utils/sort'
import TransactionInfo from '../../components/transaction-info/transaction-info'

import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X'
import TelegramIcon from '@mui/icons-material/Telegram'
import { Facebook, Instagram } from '@mui/icons-material'
import { TokenChart } from './components/token-chart/token-chart'
import { useNavigate } from 'react-router-dom'

type HashblocksInfo = {
  tx_count: number
  height: number
  eficiency: number
  week: number
}

type Hashblock = {
  id: string
  height: number
  timestamp: Date
  address: string
  value: number
  fee: number
}

const items = [
  {
    icon: <Facebook />,
    url: 'https://www.facebook.com/groups/198537324100124/'
  },
  {
    icon: <XIcon />,
    url: 'https://twitter.com/solana'
  },
  {
    icon: <Instagram />,
    url: 'https://www.instagram.com/solana/'
  },
]

const Solana: React.FC = () => {
  const navigate = useNavigate()
  const [actual, setActual] = useState('Solana')
  const [actualHashblock, setActualHashblock] = useState(null)
  const [hashblocks, setHashblocks] = useState(
    [
      {
        id: '1206070',
        tx_count: 1211,
        size: 140000,
        height: 8982,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 120000
      },
      {
        id: '1206069',
        tx_count: 2510,
        size: 140000,
        height: 8981,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 420000
      },
      {
        id: '1206068',
        tx_count: 3245,
        size: 140000,
        height: 8980,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 720000
      },
      {
        id: '1206067',
        tx_count: 1827,
        size: 140000,
        height: 8979,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 1020000
      },
      {
        id: '1206066',
        tx_count: '2517',
        size: 140000,
        height: 8978,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 1320000
      },
      {
        id: '1206065',
        tx_count: 3225,
        size: 140000,
        height: 8977,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 1620000
      },
      {
        id: '1206064',
        tx_count: 1981,
        size: 140000,
        height: 8976,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 1920000
      },
      {
        id: '1206063',
        tx_count: 1258,
        size: 140000,
        height: 8975,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 2220000
      },
      {
        id: '1206062',
        tx_count: 1428,
        size: 140000,
        height: 8974,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 2520000
      },
    ]
  )
  const [modalOpened, setModalOpened] = useState(false)
  const [chatOpened, setChatOpened] = useState(false)
  const [whaleOpened, setWhaleOpened] = useState(false)
  const [hashblockOpened, setHashblockOpened] = useState(false)
  const [info, setInfo] = useState<any>()
  const [data, setData] = useState<NetworkData>(
    {
      description: "AI: Solana network shows high transactional activity with an increase in active addresses; however, there has been a slight decrease in transaction volume on exchanges, suggesting a possible accumulation of tokens in private wallets and reduced trading movement in the short term",
      transactions: '2.020.749 transactions',
      transactionsValue: '2980937292746 SOL',
      address: '12300289033 addresses',
      token: 'SOL USD',
      links: items
    }
  )

  const verifyCacheInterval = (cache: any) => {
    if (cache.date) {
      const interval = minutesInterval(Date.now(), cache.date)

      if (interval >= 0 && interval < 5) {
        return true
      }
    }
    return false
  }

  const handleGetInfo = async (type: string, value: string) => {
    setModalOpened(true)

    if (type === 'address') {
      const response: any = await IcpService.getAddressInfo(value)

      if (response && response.includes('funded_txo_count')) {
        const data = {
          ok: JSON.parse(response),
          type: type
        }

        setInfo(data)
      }
      else {
        setInfo({ error: 'fail' })
      }
    }
    else if (type === 'transaction') {
      const response: any = await IcpService.getTransactionInfo(value)

      if (response && response.includes('txid')) {
        const data = {
          ok: JSON.parse(response),
          type: type
        }

        setInfo(data)
      }
      else {
        setInfo({ error: 'fail' })
      }
    }
  }

  const handleClose = () => {
    setInfo(null)
    setModalOpened(false)
  }

  const handleHashblock = (hashblock?: any) => {
    if (hashblock) {
      setActualHashblock(hashblock)
      // setHashblockOpened(true)
      navigate(`/solana/${hashblock.id}`, {
        state: hashblock
      })
    }
    else {
      setActualHashblock(null)
      setHashblockOpened(false)
    }
  }

  const handleOpen = (page: string) => {
    if (page === 'Whale Hunting') {
      setWhaleOpened(true)
    }
  }

  return (
    <div className={styles.home}>
      <Sidebar actual={actual} onChange={(coin) => setActual(coin)} open={(page: string) => handleOpen(page)} />
      <div className={styles.container}>
        <Header onSubmit={handleGetInfo} />
        <Hashblocks coin={actual} data={hashblocks} onSelect={(hashblock: any) => handleHashblock(hashblock)} />
        <div className={styles.info}>
          <Network data={data} />
          <div className={styles.custom}>
            <CustomTabs
              hashblocks={hashblocks}
              labels={['Token Transfers', 'Fees', 'Active Addresses', 'Transcations', 'Current Epoch']} />
          </div>
        </div>
      </div>

      {
        modalOpened && <InfoModal data={info} onClose={() => handleClose()}>
          {
            info?.type === 'address' ? <AddressInfo title="Address Information" data={info?.['ok']} />
              // : <TransactionInfo title="Transaction Information" data={info?.['ok'] && info?.['ok'][0] !== 'Invalid hex string' && JSON.parse(info?.['ok'][0])} />
              : <TransactionInfo title="Transaction Information" data={info?.['ok']} />
          }
        </InfoModal>
      }

      {
        hashblockOpened && actualHashblock && <HashblockInfo data={actualHashblock} onClose={() => handleHashblock()} />
      }

      {
        chatOpened ? (
          <OpenChat onClose={() => setChatOpened(false)} />
        )
          :
          <div className={styles.chat} onClick={() => setChatOpened(true)}>
            <Tooltip title="Community" placement="left" >
              <img src="openchat.svg" alt="" />
            </Tooltip>
          </div>
      }

      {
        whaleOpened && (
          <WhaleHunting onSelect={(id: string) => handleGetInfo('address', id)} onClose={() => setWhaleOpened(false)} />
        )
      }
    </div>
  )
}

export default Solana