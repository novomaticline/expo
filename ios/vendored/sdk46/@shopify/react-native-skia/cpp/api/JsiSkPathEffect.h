#pragma once

#include <memory>
#include <utility>

#include <ABI46_0_0jsi/ABI46_0_0jsi.h>

#include "JsiSkHostObjects.h"

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdocumentation"

#include <SkPathEffect.h>

#pragma clang diagnostic pop

namespace ABI46_0_0RNSkia {

using namespace ABI46_0_0facebook;

class JsiSkPathEffect : public JsiSkWrappingSkPtrHostObject<SkPathEffect> {
public:
  JsiSkPathEffect(std::shared_ptr<ABI46_0_0RNSkPlatformContext> context,
                  sk_sp<SkPathEffect> pathEffect)
      : JsiSkWrappingSkPtrHostObject<SkPathEffect>(std::move(context), std::move(pathEffect)) {}

  // TODO: declare in JsiSkWrappingSkPtrHostObject via extra template parameter?
  JSI_PROPERTY_GET(__typename__) {
    return jsi::String::createFromUtf8(runtime, "PathEffect");
  }

  JSI_EXPORT_PROPERTY_GETTERS(JSI_EXPORT_PROP_GET(JsiSkPathEffect, __typename__))

  /**
    Returns the underlying object from a host object of this type
   */
  static sk_sp<SkPathEffect> fromValue(jsi::Runtime &runtime,
                                       const jsi::Value &obj) {
    return obj.asObject(runtime)
        .asHostObject<JsiSkPathEffect>(runtime)
        ->getObject();
  }
};

} // namespace ABI46_0_0RNSkia
