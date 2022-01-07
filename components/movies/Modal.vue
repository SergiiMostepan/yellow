<template>
  <transition name="modal">
    <div class="modal-mask" v-if="sessionsData.length">
      <div class="modal-wrapper" @click="close">
        <div class="modal-container">

          <div class="modal-header">
            <button @click="modalStep = 1" v-if="seatsData.length" class="modal__go-back">&#8592;</button>
            <h2>Book a ticket</h2>
          </div>

          <div class="modal-body">
            <template v-if="modalStep === 1">
              <div class="sessions" v-for="item in sessionsData" :key="item.showdate">
                <div class="sessions__header">{{item.showdate}}</div>
                <div class="sessions__content">
                  <button class="sessions__btn" v-for="time in item.daytime" :key="time" @click="checkFreePlace(item.showdate, time)">{{time}}</button>
                </div>
              </div>
            </template>
            <div class="seats" v-if="modalStep === 2 && seatsData.length">
              <div class="seats__row" v-for="row in seatsData" :key="row[0].row">
                <div class="seats__row__text"><span>row</span> <span>{{row[0].row}}</span></div>
                <div class="seats__seat-wr">
                  <button @click="book(row[0].row, seat.seat, seat.is_free)" class="seats__seat" :class="{'available': seat.is_free}" v-for="seat in row[1]" :key="row[0].row + '-' + seat.seat">{{seat.seat}}</button>
                </div>
              </div>
            </div>
            <div class="ticket" v-if="modalStep === 3 && ticketData">
              <div class="ticket__row">
                <div class="ticket__title">Day time</div>
                <div class="ticket__description">{{ticketData.daytime}}</div>
              </div>
              <div class="ticket__row">
                <div class="ticket__title">Movie</div>
                <div class="ticket__description">{{movie.name}}</div>
              </div>
              <div class="ticket__row">
                <div class="ticket__title">Row</div>
                <div class="ticket__description">{{ticketData.row}}</div>
              </div>
              <div class="ticket__row">
                <div class="ticket__title">Seat</div>
                <div class="ticket__description">{{ticketData.seat}}</div>
              </div>
              <div class="ticket__row">
                <div class="ticket__title">Show date</div>
                <div class="ticket__description">{{ticketData.showdate}}</div>
              </div>
              <div class="ticket__row">
                <div class="ticket__title">Ticket key</div>
                <div class="ticket__description">{{ticketData.ticketkey}}</div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="$emit('close')">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { api } from '../../api/index'
import {mapActions} from 'vuex'
  export default {
    props: {
      movie: {
        type: Object,
        require: true
      }
    },
    data () {
      return {
        sessionsData: [],
        selectedTime: {},
        seatsData: [],
        modalStep: 1,
        ticketData: {}
      }
    },
    async created () {
      try {
        this.setLoading(true)
        const { data } = await this.$axios({
          method: "get",
          url: api.sessions.fetchSessions(this.movieId),
        })
        this.sessionsData = data.data[this.movieId].map(item => {
          return {
            showdate: item.showdate,
            daytime: item.daytime.split(';')
          }
        })
        this.setLoading(false)
      } catch (err) {
        console.log(err)
        this.setLoading(false)
      }
    },
    computed: {
      movieId () {
        return this.$route.params.id
      }
    },
    methods: {
      ...mapActions('general', ["setLoading"]),
      close (e) {
        if (e.target.className === 'modal-wrapper') {
          this.$emit('close')
        }
      },
      async book (row, seat, isFree) {
        if (!isFree) return
        try {
          this.setLoading(true)
          const {data} = await this.$axios({
            method: "post",
            url: api.bookPlace.bookPlace(),
            data: {
              movie_id: +this.movieId,
              row: +row,
              seat: +seat,
              showdate: this.selectedTime.date,
              daytime: this.selectedTime.time
            }
          })
          this.ticketData = data.data
          this.modalStep = 3
          this.setLoading(false)
        } catch (err) {
          console.log(err)
          this.setLoading(false)
        }
      },
      async checkFreePlace (date, time) {
        try {
          this.setLoading(true)
          this.selectedTime = {
            date,
            time
          }
          const {data} = await this.$axios({
            method: "get",
            url: api.showPlaces.checkFreePlace(this.movieId, time, date),
          })
          console.log(data.data)
          this.seatsData = data.data
          this.modalStep = 2
          this.setLoading(false)
        } catch (err) {
          console.log(err)
          this.setLoading(false)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '~/assets/_variables.scss';
.modal-mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  margin: 0px auto;
  padding: 20px 0px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  max-width: 1100px;
  width: 90%;
  @media screen and (max-width: $desctop-m) {
    max-width: 700px;
  }
  @media screen and (max-width: $tablet) {
    max-width: 400px;
  }
  @media screen and (max-width: $mobile-l) {
    max-width: 320px;
  }
}

.modal-header {
  padding: 0 20px;
  display: flex;
}
.modal__go-back {
  margin-right: 20px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}
.modal-body {
  margin: 20px 0;
  overflow: auto;
}

.modal-footer {
  padding: 0px 20px;
}

.modal-default-button {
  float: right;
  cursor: pointer;
}

.sessions {
  &__header {
    width: 100%;
    background-color: rgb(192, 135, 94);
    padding: 5px 10px;
    text-align: center;
  }
  &__content {
    padding: 10px 20px;
  }
  &__btn {
    margin-right: 3px;
    cursor: pointer;
  }
}
.seats {
  padding: 0px 20px;
  &__row {
    display: flex;
    &__text {
      display: flex;
      min-width: 70px;
      span {
        margin-right: 5px;
      }
    }
  }
  &__seat-wr {
    display: flex;
  }
  &__seat {
    border: none;
    background-color: red;
    min-width: 30px;
    min-height: 20px;
    margin-right: 3px;
    margin-bottom: 3px;
    text-align: center;
    line-height: 1.4;
    &.available {
      background-color: green;
      cursor: pointer;
    }
  }
}
.ticket {
  padding: 0px 20px;
  &__row {
    display: flex;
  }
  &__title {
    width: 10%;
    font-weight: 700;
  }
  &__description {
    width: 90%;
  }
}
</style>