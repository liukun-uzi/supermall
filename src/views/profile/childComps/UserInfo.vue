<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <svg fill="#ccc" class="privateImage-svg left icon" aria-hidden="true">
          <use xlink:href="#icon-UserSettings"></use>
        </svg>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <svg data-v-735ff1be="" fill="#fff" class="icon-mobile icon" aria-hidden="true">
              <use xlink:href="#icon-phone"></use>
            </svg>
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <svg fill="#fff" class="arrow-svg right icon"><use xlink:href="#icon-right"></use></svg>
    </a>
  </div>
</template>

<script>
  import iconFont from 'common/iconfont'
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    overflow: hidden;
  }
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 14px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 12px;
    height: 18px;
    left: -15px;
    top: -2px;
  }
</style>
