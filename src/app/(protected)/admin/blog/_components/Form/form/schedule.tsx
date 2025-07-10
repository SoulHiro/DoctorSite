import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, ChevronDownIcon, ClockIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { combineDateTimeLocal } from '@/lib/post-utils'

interface ScheduleComponentProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  open: boolean
  setOpen: (open: boolean) => void
}

// Opções de horário (hora em hora)
const generateTimeOptions = () => {
  const times = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 60) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      times.push(timeString)
    }
  }
  return times
}

const ScheduleComponent = ({
  date,
  setDate,
  open,
  setOpen,
}: ScheduleComponentProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date)
  const [selectedTime, setSelectedTime] = useState<string>('10:00')

  const timeOptions = generateTimeOptions()

  // Se houver data externa, sincroniza estados internos
  useEffect(() => {
    if (date) {
      setSelectedDate(date)
      setSelectedTime(format(date, 'HH:mm'))
    }
  }, [date])

  // Combina data + hora sempre que algum deles mudar
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const combinedDateTime = combineDateTimeLocal(selectedDate, selectedTime)
      // Atualiza somente se houver alteração real
      if (
        combinedDateTime &&
        (!date || date.getTime() !== combinedDateTime.getTime())
      ) {
        setDate(combinedDateTime)
      }
    }
  }, [selectedDate, selectedTime, setDate, date])

  // Helpers de validação
  const isDateInPast = (date: Date) => {
    const now = new Date()
    const compareDate = new Date(date)
    compareDate.setHours(23, 59, 59, 999)
    return compareDate < now
  }

  const isTimeInPast = (date: Date | undefined, time: string) => {
    if (!date) return false

    const combinedDateTime = combineDateTimeLocal(date, time)
    const now = new Date()
    return combinedDateTime < now
  }

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate && isDateInPast(newDate)) {
      return
    }
    setSelectedDate(newDate)
    setOpen(false)
  }

  const handleTimeSelect = (time: string) => {
    if (selectedDate && isTimeInPast(selectedDate, time)) {
      return
    }
    setSelectedTime(time)
  }

  return (
    <div className="flex gap-2">
      {/* Seletor de Data */}
      <div className="flex-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate
                ? format(selectedDate, 'dd/MM/yyyy', { locale: ptBR })
                : 'Selecione a data'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date: Date) => isDateInPast(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Seletor de Hora */}
      <div className="w-28">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center">
                <ClockIcon className="mr-2 h-4 w-4" />
                {selectedTime}
              </div>
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-60 overflow-y-auto">
            {timeOptions.map((time) => {
              const isDisabled =
                selectedDate && isTimeInPast(selectedDate, time)
              return (
                <DropdownMenuItem
                  key={time}
                  disabled={isDisabled}
                  className={isDisabled ? 'opacity-50' : ''}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default ScheduleComponent
