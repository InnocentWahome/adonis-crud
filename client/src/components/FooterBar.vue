<template>
  <footer v-show="isFooterBarVisible" class="footer">
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="footer-copyright">
              <b>&copy; {{ year }}, PrimeDevs</b> &mdash; Task & Time Tracker <span class="tag">v1.4.1</span>
            </div>
          </div>
        </div>
        <!-- <div class="level-right">
          <div class="level-item">
            <div class="logo">
              <a href="https://justboil.me">
                <svg xmlns="http://www.w3.org/2000/svg"
                width="250" height="100" viewBox="0 0 250 100">
                  <Primedevs picture/>
                </svg>
              </a>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </footer>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  name: 'FooterBar',
  computed: {
    year () {
      return dayjs().year()
    },
    ...mapState([
      'isFooterBarVisible'
    ])
  }
}
</script>
