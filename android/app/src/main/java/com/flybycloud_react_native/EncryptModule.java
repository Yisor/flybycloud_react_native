package com.flybycloud_react_native;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

/**
 * Created by Administrator on 2017/11/14 0014.
 */

public class EncryptModule extends ReactContextBaseJavaModule {
    public static final String MODULE_NAME = "EncryptModule";

    public EncryptModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void encrypt(String encryptStr, Promise promise) {
        try {
            promise.resolve(RSAClientUtil.encrypt(encryptStr));
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject(e);
            Log.d("feiba", "rsa: " + e.getMessage());
        }
    }
}
