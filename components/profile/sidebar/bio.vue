<template>
<div class="com-profile-bio">
  <div class="titlebar">
    <span class="title">Bio</span>
    <button class="btn btn-edit"></button>
  </div>
  <div class="summarybar">
    <p class="bio">{{profile.bio}}</p>
    <ul class="list-layout" v-if="ismy || profile.isFollowed == '1'">
      <li class="school">
        <span>at<b>{{profile.collegeName}}</b> {{profile.infoClass ? `(${profile.infoClass})` : ''}}</span>
      </li>
      <li class="grades" v-if="profile.fieldsStardy" v-html="renderGrades()"></li>
      <li class="sex" v-if="profile.sex">{{profile.sex}}</li>
      <li class="relation" v-if="profile.relationStatus || profile.interestedIn">
        {{profile.relationStatus}} {{profile.interestedIn ? `(Interested In ${profile.interestedIn})` : ''}}
      </li>
      <li class="birthday" v-if="profile.birthday">{{profile.birthday}}</li>
      <li class="follows">Followed by <b>{{~~profile.followers}} people {{!ismy ? `(${~~mutual.mutualCount} Mutual)` : ''}}</b></li>
    </ul>
    <ul class="list-layout" v-else>
      <li class="school">
        <span>at<b>{{profile.collegeName}}</b> {{profile.hideInfoClass=='0' && profile.infoClass ? `(${profile.infoClass})` : ''}}</span>
      </li>
      <li class="grades" v-if="profile.hideFieldStudy=='0' && profile.fieldsStardy" v-html="renderGrades()"></li>
      <li class="sex" v-if="profile.hideGender=='0' && profile.sex">{{profile.sex}}</li>
      <li class="relation" v-if="(profile.hideRelationship=='0' && profile.relationStatus) || (profile.hideInterestedIn=='0' && profile.interestedIn)">
        {{profile.relationStatus}} {{profile.interestedIn ? `(Interested In ${profile.interestedIn})` : ''}}
      </li>
      <li class="birthday" v-if="profile.hideBirthday=='0' && profile.birthday">{{profile.birthday}}</li>
      <li class="follows">Followed by <b>{{~~profile.followers}} people ({{~~mutual.mutualCount}} Mutual)</b></li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  computed: {
    profile() {
      return this.$store.state.profile.profile
    },
    mutual() {
      return this.$store.state.profile.mutual
    },
    ismy() {
      return this.$store.state.userData.userInfo.id === this.profile.stu_id
    }
  },
  methods: {
    renderGrades() {
      return `<div>${this.profile.fieldsStardy.split('||:').map(_ => {
        let arr = _.split('of'), after = arr.slice(1).join(' ').trim()
        return `<p>&middot; ${arr[0]} of <b>${after}</b></p>`
      }).join('')}</div>`
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-profile-bio {
  border: 1px solid $boxBorderColor;
  .btn-edit {
    background: url(~/assets/img/profile/Edit-icon.png) no-repeat center center/21px;
  }
  .summarybar {
    color: #aaa;
    padding: 0 20px;
    border-top: 1px solid $boxBorderColor;
    .bio {
      font-size: 16px;
      word-break: break-all;
      padding: 20px 0;
    }
    .list-layout {
      li {
        min-height: 70px;
        padding: 12px 0;
        font-size: 14px;
        border-top: 1px solid $boxBorderColor;
        display: flex;
        align-items: center;
        &:before {
          content: '';
          min-width: 27px;
          height: 32px;
          margin-right: 12px;
          background: no-repeat center center;
          background-size: contain;
        }
        b {
          font-weight: normal;
          color: $themeBlueColor;
          margin: 0 3px;
        }
        &.school:before {
          background-image: url(~/assets/img/profile/Study-icon-copy.png);
        }
        &.grades:before {
          background-image: url(~/assets/img/profile/grades-icon.png);
        }
        &.sex:before {
          background-image: url(~/assets/img/profile/Gender-icon.png);
        }
        &.relation:before {
          background-image: url(~/assets/img/profile/Vector-Smart-Object.png);
        }
        &.birthday:before {
          background-image: url(~/assets/img/profile/Calendar-icon.png);
        }
        &.follows:before {
          background-image: url(~/assets/img/profile/Feed-icon.png);
        }
      }
    }
  }
}
</style>