import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import moment from 'moment'
import Date from './Date'

const Calendar = ({ onSelectDate, selected }) => {
  const [dates, setDates] = useState([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [currentMonth, setCurrentMonth] = useState()

  // get the dates from today to 10 days from now, format them as strings and store them in state
  const getDates = () => {
    const _dates = []
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, 'days')
      _dates.push(date)
    }
    setDates(_dates)
  }

  useEffect(() => {
    getDates()
  }, [])

  /**
   * scrollPosition is the number of pixels the user has scrolled
   * we divide it by 60 because each date is 80 pixels wide and we want to get the number of dates
   * we add the number of dates to today to get the current month
   * we format it as a string and set it as the currentMonth
   */
  const getCurrentMonth = () => {
    const month = moment(dates[0]).add(scrollPosition / 60, 'days').format('MMMM')
    setCurrentMonth(month)
  }

  useEffect(() => {
    getCurrentMonth()
  }, [scrollPosition])

  return (
    <>
      <View style={styles.centered}>
        <Text style={styles.title}>{currentMonth}</Text>
      </View>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            // onScroll is a native event that returns the number of pixels the user has scrolled
            onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
          >
            {dates.map((date, index) => (
              <Date
                key={index}
                date={date}
                onSelectDate={onSelectDate}
                selected={selected}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  )
}

export default Calendar

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateSection: {
    width: '100%',
    padding: 20,
  },
  scroll: {
    height: 150,
  },
})