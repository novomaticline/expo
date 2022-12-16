//  Copyright © 2021 650 Industries. All rights reserved.

#import <ABI46_0_0EXManifests/ABI46_0_0EXManifestsManifestFactory.h>
#import <ABI46_0_0EXManifests/ABI46_0_0EXManifestsLegacyManifest.h>
#import <ABI46_0_0EXManifests/ABI46_0_0EXManifestsNewManifest.h>
#import <ABI46_0_0EXManifests/ABI46_0_0EXManifestsBareManifest.h>

@implementation ABI46_0_0EXManifestsManifestFactory

+ (nonnull ABI46_0_0EXManifestsManifest *)manifestForManifestJSON:(nonnull NSDictionary *)manifestJSON {
  ABI46_0_0EXManifestsManifest *manifest;
  if (manifestJSON[@"releaseId"]) {
    manifest = [[ABI46_0_0EXManifestsLegacyManifest alloc] initWithRawManifestJSON:manifestJSON];
  } else if (manifestJSON[@"metadata"]) {
    manifest = [[ABI46_0_0EXManifestsNewManifest alloc] initWithRawManifestJSON:manifestJSON];
  } else {
    manifest = [[ABI46_0_0EXManifestsBareManifest alloc] initWithRawManifestJSON:manifestJSON];
  }
  return manifest;
}

@end
