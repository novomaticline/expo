/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#include "ABI47_0_0ShadowNodeFamilyFragment.h"

#include <ABI47_0_0React/ABI47_0_0renderer/core/ShadowNodeFamily.h>

namespace ABI47_0_0facebook {
namespace ABI47_0_0React {

ShadowNodeFamilyFragment ShadowNodeFamilyFragment::build(
    ShadowNodeFamily const &family) {
  return {
      family.tag_,
      family.surfaceId_,
      family.eventEmitter_,
  };
}

using Value = ShadowNodeFamilyFragment::Value;

Value::Value(ShadowNodeFamilyFragment const &fragment)
    : tag(fragment.tag),
      surfaceId(fragment.surfaceId),
      eventEmitter(fragment.eventEmitter) {}

Value::operator ShadowNodeFamilyFragment() const {
  return ShadowNodeFamilyFragment{tag, surfaceId, eventEmitter};
}

} // namespace ABI47_0_0React
} // namespace ABI47_0_0facebook
