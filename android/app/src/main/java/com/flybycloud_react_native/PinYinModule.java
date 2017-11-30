package com.flybycloud_react_native;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by Administrator on 2017/11/30 0030.
 */

public class PinYinModule extends ReactContextBaseJavaModule {
    public static final String MODULE_NAME = "PinYinModule";

    public PinYinModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void getPinYinFirstLetter(String chines, Promise promise) {
        promise.resolve(PinYinUtil.getPinYinFirstLetter(chines));
    }

    @ReactMethod
    public void getPinYin(String chines, Promise promise) {
        promise.resolve(PinYinUtil.getPinYin(chines));
    }
}
