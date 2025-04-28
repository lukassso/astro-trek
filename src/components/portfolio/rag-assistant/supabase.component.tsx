import { useEffect, useState } from 'react'
import { supabase } from '@/supabase/client'

interface Stock {
  id: number
  name: string
  age: number

  ticket: string
  survived: number
  
}

export default function Profiles() {
  const [stocks, setStocks] = useState<Stock[]>([])

  useEffect(() => {
    const fetchStocks = async () => {
      const { data, error } = await supabase
        .from('titanic') // Twoja tabela
        .select('"name", "age", "ticket", "survived"')

      if (error) {
        console.error('Supabase error:', error)
      } else {
        setStocks(data || [])
      }
    }

    fetchStocks()
  }, [])

  return (
    <div>
      <h2>Titanic set</h2>
      <ul>
        {stocks.map(stock => (
          <li key={stock.id}>
            {stock.name} - {stock.age} - {stock.ticket} - {stock.survived ? 'Survived' : 'Did not survive'} 
          </li>
        ))}
      </ul>
    </div>
  )
}
