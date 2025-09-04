package com.xpos

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.os.Bundle
import com.facebook.react.ReactRootView
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView
import com.zoontek.rnbootsplash.RNBootSplash

class MainActivity:
ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */


  
  override fun onCreate(savedInstanceState: Bundle?) {
     RNBootSplash.init(this, R.style.BootTheme);
    super.onCreate(savedInstanceState);
  }

  override fun getMainComponentName(): String = "XPOS"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      object : ReactActivityDelegate(this, mainComponentName) {
          override fun createRootView(): ReactRootView {
              return RNGestureHandlerEnabledRootView(this@MainActivity)
          }
      }
}
