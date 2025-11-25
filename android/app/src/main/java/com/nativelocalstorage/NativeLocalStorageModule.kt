package com.nativelocalstorage

import android.app.WallpaperManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import com.facebook.react.bridge.Promise
import android.content.Context
import android.content.SharedPreferences
import com.nativelocalstorage.NativeLocalStorageSpec
import com.facebook.react.bridge.ReactApplicationContext
import java.io.IOException
import java.io.InputStream
import java.net.HttpURLConnection
import java.net.URL


class NativeLocalStorageModule(reactContext: ReactApplicationContext) : NativeLocalStorageSpec(reactContext) {

  override fun getName() = NAME

  override fun setWallpaper(imageUrl: String): String? {
    try {
      val bitmap = getBitmapFromUrl(imageUrl)
      if (bitmap != null) {
        val wallpaperManager = WallpaperManager.getInstance(reactApplicationContext)
        wallpaperManager.setBitmap(bitmap)

//        promise.resolve("Wallpaper set successfully")

        return "Wallpaper set successfully"
      } else {
//        promise.reject("Error", "Failed to get image from URL")
        return "Failed"
      }
    } catch (e: IOException) {
//      promise.reject("Error", e.message)
      return "Error"
    }
  }

  @Throws(IOException::class)
  fun getBitmapFromUrl(imageUrl: String?): Bitmap? {
    try {
      val url = URL(imageUrl)
      val connection = url.openConnection() as HttpURLConnection

      connection.requestMethod = "GET"
      connection.connect()
      val inputStream: InputStream = connection.inputStream
      return BitmapFactory.decodeStream(inputStream)
    } catch (e: IOException) {
      throw e
    }
  }
  override fun setItem(value: String, key: String) {
    val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val editor = sharedPref.edit()
    editor.putString(key, value)
    editor.apply()
  }

  override fun getItem(key: String): String? {
    val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val username = sharedPref.getString(key, null)
    return username.toString()
  }

  override fun removeItem(key: String) {
    val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val editor = sharedPref.edit()
    editor.remove(key)
    editor.apply()
  }

  override fun clear() {
    val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val editor = sharedPref.edit()
    editor.clear()
    editor.apply()
  }

  companion object {
    const val NAME = "NativeLocalStorage"
  }
}