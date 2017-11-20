//
//  EncryptModule.m
//  flybycloud_react_native
//
//  Created by FangJ on 2017/11/18.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "EncryptModule.h"
#import "RSAHandler.h"

#define RSA_Public_key  @"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCcYh1x2qXbimdxcu/S4ClyjMksf9bxGYMHgXVfpxC+7AyeGTB+mHq1eZr+ps8kBVH7t9+ZROSm8QoU0d0aIm5cs+SY5PhjwqmSRw1LpQFVP41Gb8nvErXXpfs29aWNDID8B5fMglNd39wBWvX07qyVPzDYQs6I7LESK/ggIYbgnQIDAQAB"

@implementation EncryptModule

RCT_EXPORT_MODULE(EncryptModule);

RCT_EXPORT_METHOD(rsa:(NSString *)encryptStr resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
  RSAHandler *handler = [[RSAHandler alloc] init];
  [handler importKeyWithType:KeyTypePublic andkeyString:RSA_Public_key];
  resolve([handler encryptWithPublicKey:encryptStr]);
}

@end
