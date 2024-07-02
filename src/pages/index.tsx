import { mdiAccountMultiple } from '@mdi/js'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import CardBox from '../components/CardBox'
import TableSampleClients from '../components/Table/SampleClients'
import { getPageTitle } from '../config'
import ModalForm from '../components/Modal'
import { items } from '../hooks/items'

const DashboardPage = () => {
  const [category, setCategory] = useState('all')
  const [isModalActive, setIsModalActive] = useState(false)
  const [itemsData, setItems] = useState(null)
  const [isUpdated, setIsUpdated] = useState(false)

  const openModal = () => setIsModalActive(true)
  const closeModal = () => setIsModalActive(false)

  const addItem = (newItem) => {
    const updatedItems = [...itemsData, newItem]
    setItems(updatedItems)
    localStorage.setItem('items', JSON.stringify(updatedItems))
  }

  const handleUpdated = (value) => {
    setIsUpdated(value)
  }

  useEffect(() => {
    const storedItems = localStorage.getItem('items')
    if (storedItems) {
      setItems(JSON.parse(storedItems))
    } else {
      setItems(items)
    }
  }, [])

  useEffect(() => {
    if (isUpdated) {
      const storedItems = localStorage.getItem('items')
      setItems(JSON.parse(storedItems))
    }
  }, [isUpdated])

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Dashboard" />

        <div className="flex items-center justify-between space-x-4 mb-4 w-full">
          <form className="max-w-sm w-32">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="a">Toko A</option>
              <option value="b">Toko B</option>
            </select>
          </form>
          <button
            onClick={() => {
              openModal
              setIsUpdated(false)
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Tambah Data
          </button>
        </div>

        <CardBox hasTable>
          {itemsData ? (
            <TableSampleClients items={itemsData} category={category} setUpdated={handleUpdated} />
          ) : null}
        </CardBox>
      </SectionMain>

      <ModalForm
        isActive={isModalActive}
        onClose={closeModal}
        addItem={addItem}
        category={category}
        setUpdated={handleUpdated}
      />
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DashboardPage
