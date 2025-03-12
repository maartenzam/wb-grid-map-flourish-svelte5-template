var template = function(exports) {
  "use strict";var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

  var _listeners, _observer, _options, _ResizeObserverSingleton_instances, getObserver_fn;
  const EACH_ITEM_REACTIVE = 1;
  const EACH_INDEX_REACTIVE = 1 << 1;
  const EACH_ITEM_IMMUTABLE = 1 << 4;
  const PROPS_IS_IMMUTABLE = 1;
  const PROPS_IS_RUNES = 1 << 1;
  const PROPS_IS_UPDATED = 1 << 2;
  const PROPS_IS_BINDABLE = 1 << 3;
  const PROPS_IS_LAZY_INITIAL = 1 << 4;
  const TEMPLATE_FRAGMENT = 1;
  const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
  const UNINITIALIZED = Symbol();
  const FILENAME = Symbol("filename");
  const DEV = true;
  const DERIVED = 1 << 1;
  const EFFECT = 1 << 2;
  const RENDER_EFFECT = 1 << 3;
  const BLOCK_EFFECT = 1 << 4;
  const BRANCH_EFFECT = 1 << 5;
  const ROOT_EFFECT = 1 << 6;
  const BOUNDARY_EFFECT = 1 << 7;
  const UNOWNED = 1 << 8;
  const DISCONNECTED = 1 << 9;
  const CLEAN = 1 << 10;
  const DIRTY = 1 << 11;
  const MAYBE_DIRTY = 1 << 12;
  const INERT = 1 << 13;
  const DESTROYED = 1 << 14;
  const EFFECT_RAN = 1 << 15;
  const EFFECT_TRANSPARENT = 1 << 16;
  const LEGACY_DERIVED_PROP = 1 << 17;
  const INSPECT_EFFECT = 1 << 18;
  const HEAD_EFFECT = 1 << 19;
  const EFFECT_HAS_DERIVED = 1 << 20;
  const STATE_SYMBOL = Symbol("$state");
  const STATE_SYMBOL_METADATA = Symbol("$state metadata");
  const LEGACY_PROPS = Symbol("legacy props");
  const LOADING_ATTR_SYMBOL = Symbol("");
  var is_array = Array.isArray;
  var index_of = Array.prototype.indexOf;
  var array_from = Array.from;
  var define_property = Object.defineProperty;
  var get_descriptor = Object.getOwnPropertyDescriptor;
  var get_descriptors = Object.getOwnPropertyDescriptors;
  var object_prototype = Object.prototype;
  var array_prototype = Array.prototype;
  var get_prototype_of = Object.getPrototypeOf;
  const noop = () => {
  };
  function run(fn) {
    return fn();
  }
  function run_all(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i]();
    }
  }
  let micro_tasks = [];
  function run_micro_tasks() {
    var tasks = micro_tasks;
    micro_tasks = [];
    run_all(tasks);
  }
  function queue_micro_task(fn) {
    if (micro_tasks.length === 0) {
      queueMicrotask(run_micro_tasks);
    }
    micro_tasks.push(fn);
  }
  function equals$1(value) {
    return value === this.v;
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
  }
  function safe_equals(value) {
    return !safe_not_equal(value, this.v);
  }
  function bind_invalid_checkbox_value() {
    {
      const error = new Error(`bind_invalid_checkbox_value
Using \`bind:value\` together with a checkbox input is not allowed. Use \`bind:checked\` instead
https://svelte.dev/e/bind_invalid_checkbox_value`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function component_api_changed(parent, method, component) {
    {
      const error = new Error(`component_api_changed
${parent} called \`${method}\` on an instance of ${component}, which is no longer valid in Svelte 5
https://svelte.dev/e/component_api_changed`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function component_api_invalid_new(component, name) {
    {
      const error = new Error(`component_api_invalid_new
Attempted to instantiate ${component} with \`new ${name}\`, which is no longer valid in Svelte 5. If this component is not under your control, set the \`compatibility.componentApi\` compiler option to \`4\` to keep it working.
https://svelte.dev/e/component_api_invalid_new`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function derived_references_self() {
    {
      const error = new Error(`derived_references_self
A derived value cannot reference itself recursively
https://svelte.dev/e/derived_references_self`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function effect_in_teardown(rune) {
    {
      const error = new Error(`effect_in_teardown
\`${rune}\` cannot be used inside an effect cleanup function
https://svelte.dev/e/effect_in_teardown`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function effect_in_unowned_derived() {
    {
      const error = new Error(`effect_in_unowned_derived
Effect cannot be created inside a \`$derived\` value that was not itself created inside an effect
https://svelte.dev/e/effect_in_unowned_derived`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function effect_orphan(rune) {
    {
      const error = new Error(`effect_orphan
\`${rune}\` can only be used inside an effect (e.g. during component initialisation)
https://svelte.dev/e/effect_orphan`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function effect_update_depth_exceeded() {
    {
      const error = new Error(`effect_update_depth_exceeded
Maximum update depth exceeded. This can happen when a reactive block or effect repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops
https://svelte.dev/e/effect_update_depth_exceeded`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function invalid_snippet() {
    {
      const error = new Error(`invalid_snippet
Could not \`{@render}\` snippet due to the expression being \`null\` or \`undefined\`. Consider using optional chaining \`{@render snippet?.()}\`
https://svelte.dev/e/invalid_snippet`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function props_invalid_value(key) {
    {
      const error = new Error(`props_invalid_value
Cannot do \`bind:${key}={undefined}\` when \`${key}\` has a fallback value
https://svelte.dev/e/props_invalid_value`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function rune_outside_svelte(rune) {
    {
      const error = new Error(`rune_outside_svelte
The \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files
https://svelte.dev/e/rune_outside_svelte`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function state_descriptors_fixed() {
    {
      const error = new Error(`state_descriptors_fixed
Property descriptors defined on \`$state\` objects must contain \`value\` and always be \`enumerable\`, \`configurable\` and \`writable\`.
https://svelte.dev/e/state_descriptors_fixed`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function state_prototype_fixed() {
    {
      const error = new Error(`state_prototype_fixed
Cannot set prototype of \`$state\` object
https://svelte.dev/e/state_prototype_fixed`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function state_unsafe_local_read() {
    {
      const error = new Error(`state_unsafe_local_read
Reading state that was created inside the same derived is forbidden. Consider using \`untrack\` to read locally created state
https://svelte.dev/e/state_unsafe_local_read`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function state_unsafe_mutation() {
    {
      const error = new Error(`state_unsafe_mutation
Updating state inside a derived or a template expression is forbidden. If the value should not be reactive, declare it without \`$state\`
https://svelte.dev/e/state_unsafe_mutation`);
      error.name = "Svelte error";
      throw error;
    }
  }
  let legacy_mode_flag = false;
  let tracing_mode_flag = false;
  function enable_legacy_mode_flag() {
    legacy_mode_flag = true;
  }
  let inspect_effects = /* @__PURE__ */ new Set();
  function set_inspect_effects(v) {
    inspect_effects = v;
  }
  function source(v, stack2) {
    var signal = {
      f: 0,
      // TODO ideally we could skip this altogether, but it causes type errors
      v,
      reactions: null,
      equals: equals$1,
      rv: 0,
      wv: 0
    };
    return signal;
  }
  function state$1(v) {
    return /* @__PURE__ */ push_derived_source(source(v));
  }
  // @__NO_SIDE_EFFECTS__
  function mutable_source(initial_value, immutable = false) {
    var _a;
    const s = source(initial_value);
    if (!immutable) {
      s.equals = safe_equals;
    }
    if (legacy_mode_flag && component_context !== null && component_context.l !== null) {
      ((_a = component_context.l).s ?? (_a.s = [])).push(s);
    }
    return s;
  }
  // @__NO_SIDE_EFFECTS__
  function push_derived_source(source2) {
    if (active_reaction !== null && !untracking && (active_reaction.f & DERIVED) !== 0) {
      if (derived_sources === null) {
        set_derived_sources([source2]);
      } else {
        derived_sources.push(source2);
      }
    }
    return source2;
  }
  function set(source2, value) {
    if (active_reaction !== null && !untracking && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT)) !== 0 && // If the source was created locally within the current derived, then
    // we allow the mutation.
    (derived_sources === null || !derived_sources.includes(source2))) {
      state_unsafe_mutation();
    }
    return internal_set(source2, value);
  }
  function internal_set(source2, value) {
    if (!source2.equals(value)) {
      source2.v;
      source2.v = value;
      source2.wv = increment_write_version();
      mark_reactions(source2, DIRTY);
      if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
        if (untracked_writes === null) {
          set_untracked_writes([source2]);
        } else {
          untracked_writes.push(source2);
        }
      }
      if (inspect_effects.size > 0) {
        const inspects = Array.from(inspect_effects);
        for (const effect2 of inspects) {
          if ((effect2.f & CLEAN) !== 0) {
            set_signal_status(effect2, MAYBE_DIRTY);
          }
          if (check_dirtiness(effect2)) {
            update_effect(effect2);
          }
        }
        inspect_effects.clear();
      }
    }
    return value;
  }
  function mark_reactions(signal, status) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    var runes = is_runes();
    var length = reactions.length;
    for (var i = 0; i < length; i++) {
      var reaction = reactions[i];
      var flags = reaction.f;
      if ((flags & DIRTY) !== 0) continue;
      if (!runes && reaction === active_effect) continue;
      if ((flags & INSPECT_EFFECT) !== 0) {
        inspect_effects.add(reaction);
        continue;
      }
      set_signal_status(reaction, status);
      if ((flags & (CLEAN | UNOWNED)) !== 0) {
        if ((flags & DERIVED) !== 0) {
          mark_reactions(
            /** @type {Derived} */
            reaction,
            MAYBE_DIRTY
          );
        } else {
          schedule_effect(
            /** @type {Effect} */
            reaction
          );
        }
      }
    }
  }
  // @__NO_SIDE_EFFECTS__
  function derived(fn) {
    var flags = DERIVED | DIRTY;
    var parent_derived = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? (
      /** @type {Derived} */
      active_reaction
    ) : null;
    if (active_effect === null || parent_derived !== null && (parent_derived.f & UNOWNED) !== 0) {
      flags |= UNOWNED;
    } else {
      active_effect.f |= EFFECT_HAS_DERIVED;
    }
    const signal = {
      ctx: component_context,
      deps: null,
      effects: null,
      equals: equals$1,
      f: flags,
      fn,
      reactions: null,
      rv: 0,
      v: (
        /** @type {V} */
        null
      ),
      wv: 0,
      parent: parent_derived ?? active_effect
    };
    return signal;
  }
  // @__NO_SIDE_EFFECTS__
  function derived_safe_equal(fn) {
    const signal = /* @__PURE__ */ derived(fn);
    signal.equals = safe_equals;
    return signal;
  }
  function destroy_derived_effects(derived2) {
    var effects = derived2.effects;
    if (effects !== null) {
      derived2.effects = null;
      for (var i = 0; i < effects.length; i += 1) {
        destroy_effect(
          /** @type {Effect} */
          effects[i]
        );
      }
    }
  }
  let stack = [];
  function get_derived_parent_effect(derived2) {
    var parent = derived2.parent;
    while (parent !== null) {
      if ((parent.f & DERIVED) === 0) {
        return (
          /** @type {Effect} */
          parent
        );
      }
      parent = parent.parent;
    }
    return null;
  }
  function execute_derived(derived2) {
    var value;
    var prev_active_effect = active_effect;
    set_active_effect(get_derived_parent_effect(derived2));
    {
      let prev_inspect_effects = inspect_effects;
      set_inspect_effects(/* @__PURE__ */ new Set());
      try {
        if (stack.includes(derived2)) {
          derived_references_self();
        }
        stack.push(derived2);
        destroy_derived_effects(derived2);
        value = update_reaction(derived2);
      } finally {
        set_active_effect(prev_active_effect);
        set_inspect_effects(prev_inspect_effects);
        stack.pop();
      }
    }
    return value;
  }
  function update_derived(derived2) {
    var value = execute_derived(derived2);
    var status = (skip_reaction || (derived2.f & UNOWNED) !== 0) && derived2.deps !== null ? MAYBE_DIRTY : CLEAN;
    set_signal_status(derived2, status);
    if (!derived2.equals(value)) {
      derived2.v = value;
      derived2.wv = increment_write_version();
    }
  }
  var bold = "font-weight: bold";
  var normal = "font-weight: normal";
  function ownership_invalid_binding(parent, child2, owner) {
    {
      console.warn(`%c[svelte] ownership_invalid_binding
%c${parent} passed a value to ${child2} with \`bind:\`, but the value is owned by ${owner}. Consider creating a binding between ${owner} and ${parent}
https://svelte.dev/e/ownership_invalid_binding`, bold, normal);
    }
  }
  function ownership_invalid_mutation(component, owner) {
    {
      console.warn(`%c[svelte] ownership_invalid_mutation
%c${component ? `${component} mutated a value owned by ${owner}. This is strongly discouraged. Consider passing values to child components with \`bind:\`, or use a callback instead` : "Mutating a value outside the component that created it is strongly discouraged. Consider passing values to child components with `bind:`, or use a callback instead"}
https://svelte.dev/e/ownership_invalid_mutation`, bold, normal);
    }
  }
  function state_proxy_equality_mismatch(operator) {
    {
      console.warn(`%c[svelte] state_proxy_equality_mismatch
%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${operator}\` will produce unexpected results
https://svelte.dev/e/state_proxy_equality_mismatch`, bold, normal);
    }
  }
  let hydrating = false;
  function proxy(value, parent = null, prev) {
    var _a, _b;
    if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
      return value;
    }
    const prototype = get_prototype_of(value);
    if (prototype !== object_prototype && prototype !== array_prototype) {
      return value;
    }
    var sources = /* @__PURE__ */ new Map();
    var is_proxied_array = is_array(value);
    var version = source(0);
    if (is_proxied_array) {
      sources.set("length", source(
        /** @type {any[]} */
        value.length
      ));
    }
    var metadata;
    {
      metadata = {
        parent,
        owners: null
      };
      if (prev) {
        const prev_owners = (_b = (_a = prev.v) == null ? void 0 : _a[STATE_SYMBOL_METADATA]) == null ? void 0 : _b.owners;
        metadata.owners = prev_owners ? new Set(prev_owners) : null;
      } else {
        metadata.owners = parent === null ? component_context !== null ? /* @__PURE__ */ new Set([component_context.function]) : null : /* @__PURE__ */ new Set();
      }
    }
    return new Proxy(
      /** @type {any} */
      value,
      {
        defineProperty(_, prop2, descriptor) {
          if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
            state_descriptors_fixed();
          }
          var s = sources.get(prop2);
          if (s === void 0) {
            s = source(descriptor.value);
            sources.set(prop2, s);
          } else {
            set(s, proxy(descriptor.value, metadata));
          }
          return true;
        },
        deleteProperty(target, prop2) {
          var s = sources.get(prop2);
          if (s === void 0) {
            if (prop2 in target) {
              sources.set(prop2, source(UNINITIALIZED));
            }
          } else {
            if (is_proxied_array && typeof prop2 === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop2);
              if (Number.isInteger(n) && n < ls.v) {
                set(ls, n);
              }
            }
            set(s, UNINITIALIZED);
            update_version(version);
          }
          return true;
        },
        get(target, prop2, receiver) {
          var _a2;
          if (prop2 === STATE_SYMBOL_METADATA) {
            return metadata;
          }
          if (prop2 === STATE_SYMBOL) {
            return value;
          }
          var s = sources.get(prop2);
          var exists = prop2 in target;
          if (s === void 0 && (!exists || ((_a2 = get_descriptor(target, prop2)) == null ? void 0 : _a2.writable))) {
            s = source(proxy(exists ? target[prop2] : UNINITIALIZED, metadata));
            sources.set(prop2, s);
          }
          if (s !== void 0) {
            var v = get(s);
            {
              var prop_metadata = v == null ? void 0 : v[STATE_SYMBOL_METADATA];
              if (prop_metadata && (prop_metadata == null ? void 0 : prop_metadata.parent) !== metadata) {
                widen_ownership(metadata, prop_metadata);
              }
            }
            return v === UNINITIALIZED ? void 0 : v;
          }
          return Reflect.get(target, prop2, receiver);
        },
        getOwnPropertyDescriptor(target, prop2) {
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor && "value" in descriptor) {
            var s = sources.get(prop2);
            if (s) descriptor.value = get(s);
          } else if (descriptor === void 0) {
            var source2 = sources.get(prop2);
            var value2 = source2 == null ? void 0 : source2.v;
            if (source2 !== void 0 && value2 !== UNINITIALIZED) {
              return {
                enumerable: true,
                configurable: true,
                value: value2,
                writable: true
              };
            }
          }
          return descriptor;
        },
        has(target, prop2) {
          var _a2;
          if (prop2 === STATE_SYMBOL_METADATA) {
            return true;
          }
          if (prop2 === STATE_SYMBOL) {
            return true;
          }
          var s = sources.get(prop2);
          var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop2);
          if (s !== void 0 || active_effect !== null && (!has || ((_a2 = get_descriptor(target, prop2)) == null ? void 0 : _a2.writable))) {
            if (s === void 0) {
              s = source(has ? proxy(target[prop2], metadata) : UNINITIALIZED);
              sources.set(prop2, s);
            }
            var value2 = get(s);
            if (value2 === UNINITIALIZED) {
              return false;
            }
          }
          return has;
        },
        set(target, prop2, value2, receiver) {
          var _a2;
          var s = sources.get(prop2);
          var has = prop2 in target;
          if (is_proxied_array && prop2 === "length") {
            for (var i = value2; i < /** @type {Source<number>} */
            s.v; i += 1) {
              var other_s = sources.get(i + "");
              if (other_s !== void 0) {
                set(other_s, UNINITIALIZED);
              } else if (i in target) {
                other_s = source(UNINITIALIZED);
                sources.set(i + "", other_s);
              }
            }
          }
          if (s === void 0) {
            if (!has || ((_a2 = get_descriptor(target, prop2)) == null ? void 0 : _a2.writable)) {
              s = source(void 0);
              set(s, proxy(value2, metadata));
              sources.set(prop2, s);
            }
          } else {
            has = s.v !== UNINITIALIZED;
            set(s, proxy(value2, metadata));
          }
          {
            var prop_metadata = value2 == null ? void 0 : value2[STATE_SYMBOL_METADATA];
            if (prop_metadata && (prop_metadata == null ? void 0 : prop_metadata.parent) !== metadata) {
              widen_ownership(metadata, prop_metadata);
            }
            check_ownership(metadata);
          }
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor == null ? void 0 : descriptor.set) {
            descriptor.set.call(receiver, value2);
          }
          if (!has) {
            if (is_proxied_array && typeof prop2 === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop2);
              if (Number.isInteger(n) && n >= ls.v) {
                set(ls, n + 1);
              }
            }
            update_version(version);
          }
          return true;
        },
        ownKeys(target) {
          get(version);
          var own_keys = Reflect.ownKeys(target).filter((key2) => {
            var source3 = sources.get(key2);
            return source3 === void 0 || source3.v !== UNINITIALIZED;
          });
          for (var [key, source2] of sources) {
            if (source2.v !== UNINITIALIZED && !(key in target)) {
              own_keys.push(key);
            }
          }
          return own_keys;
        },
        setPrototypeOf() {
          state_prototype_fixed();
        }
      }
    );
  }
  function update_version(signal, d = 1) {
    set(signal, signal.v + d);
  }
  function get_proxied_value(value) {
    if (value !== null && typeof value === "object" && STATE_SYMBOL in value) {
      return value[STATE_SYMBOL];
    }
    return value;
  }
  function init_array_prototype_warnings() {
    const array_prototype2 = Array.prototype;
    const cleanup = Array.__svelte_cleanup;
    if (cleanup) {
      cleanup();
    }
    const { indexOf, lastIndexOf, includes } = array_prototype2;
    array_prototype2.indexOf = function(item, from_index) {
      const index2 = indexOf.call(this, item, from_index);
      if (index2 === -1) {
        for (let i = from_index ?? 0; i < this.length; i += 1) {
          if (get_proxied_value(this[i]) === item) {
            state_proxy_equality_mismatch("array.indexOf(...)");
            break;
          }
        }
      }
      return index2;
    };
    array_prototype2.lastIndexOf = function(item, from_index) {
      const index2 = lastIndexOf.call(this, item, from_index ?? this.length - 1);
      if (index2 === -1) {
        for (let i = 0; i <= (from_index ?? this.length - 1); i += 1) {
          if (get_proxied_value(this[i]) === item) {
            state_proxy_equality_mismatch("array.lastIndexOf(...)");
            break;
          }
        }
      }
      return index2;
    };
    array_prototype2.includes = function(item, from_index) {
      const has = includes.call(this, item, from_index);
      if (!has) {
        for (let i = 0; i < this.length; i += 1) {
          if (get_proxied_value(this[i]) === item) {
            state_proxy_equality_mismatch("array.includes(...)");
            break;
          }
        }
      }
      return has;
    };
    Array.__svelte_cleanup = () => {
      array_prototype2.indexOf = indexOf;
      array_prototype2.lastIndexOf = lastIndexOf;
      array_prototype2.includes = includes;
    };
  }
  function strict_equals(a, b, equal = true) {
    try {
      if (a === b !== (get_proxied_value(a) === get_proxied_value(b))) {
        state_proxy_equality_mismatch(equal ? "===" : "!==");
      }
    } catch {
    }
    return a === b === equal;
  }
  function equals(a, b, equal = true) {
    if (a == b !== (get_proxied_value(a) == get_proxied_value(b))) {
      state_proxy_equality_mismatch(equal ? "==" : "!=");
    }
    return a == b === equal;
  }
  var $window;
  var is_firefox;
  var first_child_getter;
  var next_sibling_getter;
  function init_operations() {
    if ($window !== void 0) {
      return;
    }
    $window = window;
    is_firefox = /Firefox/.test(navigator.userAgent);
    var element_prototype = Element.prototype;
    var node_prototype = Node.prototype;
    first_child_getter = get_descriptor(node_prototype, "firstChild").get;
    next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
    element_prototype.__click = void 0;
    element_prototype.__className = void 0;
    element_prototype.__attributes = null;
    element_prototype.__styles = null;
    element_prototype.__e = void 0;
    Text.prototype.__t = void 0;
    {
      element_prototype.__svelte_meta = null;
      init_array_prototype_warnings();
    }
  }
  function create_text(value = "") {
    return document.createTextNode(value);
  }
  // @__NO_SIDE_EFFECTS__
  function get_first_child(node) {
    return first_child_getter.call(node);
  }
  // @__NO_SIDE_EFFECTS__
  function get_next_sibling(node) {
    return next_sibling_getter.call(node);
  }
  function child(node, is_text) {
    {
      return /* @__PURE__ */ get_first_child(node);
    }
  }
  function first_child(fragment, is_text) {
    {
      var first = (
        /** @type {DocumentFragment} */
        /* @__PURE__ */ get_first_child(
          /** @type {Node} */
          fragment
        )
      );
      if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
      return first;
    }
  }
  function sibling(node, count = 1, is_text = false) {
    let next_sibling = node;
    while (count--) {
      next_sibling = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(next_sibling);
    }
    {
      return next_sibling;
    }
  }
  function clear_text_content(node) {
    node.textContent = "";
  }
  const handled_errors = /* @__PURE__ */ new WeakSet();
  let is_throwing_error = false;
  let is_flushing = false;
  let last_scheduled_effect = null;
  let is_updating_effect = false;
  let is_destroying_effect = false;
  function set_is_destroying_effect(value) {
    is_destroying_effect = value;
  }
  let queued_root_effects = [];
  let dev_effect_stack = [];
  let active_reaction = null;
  let untracking = false;
  function set_active_reaction(reaction) {
    active_reaction = reaction;
  }
  let active_effect = null;
  function set_active_effect(effect2) {
    active_effect = effect2;
  }
  let derived_sources = null;
  function set_derived_sources(sources) {
    derived_sources = sources;
  }
  let new_deps = null;
  let skipped_deps = 0;
  let untracked_writes = null;
  function set_untracked_writes(value) {
    untracked_writes = value;
  }
  let write_version = 1;
  let read_version = 0;
  let skip_reaction = false;
  function increment_write_version() {
    return ++write_version;
  }
  function check_dirtiness(reaction) {
    var _a;
    var flags = reaction.f;
    if ((flags & DIRTY) !== 0) {
      return true;
    }
    if ((flags & MAYBE_DIRTY) !== 0) {
      var dependencies = reaction.deps;
      var is_unowned = (flags & UNOWNED) !== 0;
      if (dependencies !== null) {
        var i;
        var dependency;
        var is_disconnected = (flags & DISCONNECTED) !== 0;
        var is_unowned_connected = is_unowned && active_effect !== null && !skip_reaction;
        var length = dependencies.length;
        if (is_disconnected || is_unowned_connected) {
          var derived2 = (
            /** @type {Derived} */
            reaction
          );
          var parent = derived2.parent;
          for (i = 0; i < length; i++) {
            dependency = dependencies[i];
            if (is_disconnected || !((_a = dependency == null ? void 0 : dependency.reactions) == null ? void 0 : _a.includes(derived2))) {
              (dependency.reactions ?? (dependency.reactions = [])).push(derived2);
            }
          }
          if (is_disconnected) {
            derived2.f ^= DISCONNECTED;
          }
          if (is_unowned_connected && parent !== null && (parent.f & UNOWNED) === 0) {
            derived2.f ^= UNOWNED;
          }
        }
        for (i = 0; i < length; i++) {
          dependency = dependencies[i];
          if (check_dirtiness(
            /** @type {Derived} */
            dependency
          )) {
            update_derived(
              /** @type {Derived} */
              dependency
            );
          }
          if (dependency.wv > reaction.wv) {
            return true;
          }
        }
      }
      if (!is_unowned || active_effect !== null && !skip_reaction) {
        set_signal_status(reaction, CLEAN);
      }
    }
    return false;
  }
  function propagate_error(error, effect2) {
    var current = effect2;
    while (current !== null) {
      if ((current.f & BOUNDARY_EFFECT) !== 0) {
        try {
          current.fn(error);
          return;
        } catch {
          current.f ^= BOUNDARY_EFFECT;
        }
      }
      current = current.parent;
    }
    is_throwing_error = false;
    throw error;
  }
  function should_rethrow_error(effect2) {
    return (effect2.f & DESTROYED) === 0 && (effect2.parent === null || (effect2.parent.f & BOUNDARY_EFFECT) === 0);
  }
  function handle_error(error, effect2, previous_effect, component_context2) {
    var _a, _b;
    if (is_throwing_error) {
      if (previous_effect === null) {
        is_throwing_error = false;
      }
      if (should_rethrow_error(effect2)) {
        throw error;
      }
      return;
    }
    if (previous_effect !== null) {
      is_throwing_error = true;
    }
    if (component_context2 === null || !(error instanceof Error) || handled_errors.has(error)) {
      propagate_error(error, effect2);
      return;
    }
    handled_errors.add(error);
    const component_stack = [];
    const effect_name = (_a = effect2.fn) == null ? void 0 : _a.name;
    if (effect_name) {
      component_stack.push(effect_name);
    }
    let current_context = component_context2;
    while (current_context !== null) {
      {
        var filename = (_b = current_context.function) == null ? void 0 : _b[FILENAME];
        if (filename) {
          const file = filename.split("/").pop();
          component_stack.push(file);
        }
      }
      current_context = current_context.p;
    }
    const indent = is_firefox ? "  " : "	";
    define_property(error, "message", {
      value: error.message + `
${component_stack.map((name) => `
${indent}in ${name}`).join("")}
`
    });
    define_property(error, "component_stack", {
      value: component_stack
    });
    const stack2 = error.stack;
    if (stack2) {
      const lines = stack2.split("\n");
      const new_lines = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes("svelte/src/internal")) {
          continue;
        }
        new_lines.push(line);
      }
      define_property(error, "stack", {
        value: new_lines.join("\n")
      });
    }
    propagate_error(error, effect2);
    if (should_rethrow_error(effect2)) {
      throw error;
    }
  }
  function schedule_possible_effect_self_invalidation(signal, effect2, root2 = true) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    for (var i = 0; i < reactions.length; i++) {
      var reaction = reactions[i];
      if ((reaction.f & DERIVED) !== 0) {
        schedule_possible_effect_self_invalidation(
          /** @type {Derived} */
          reaction,
          effect2,
          false
        );
      } else if (effect2 === reaction) {
        if (root2) {
          set_signal_status(reaction, DIRTY);
        } else if ((reaction.f & CLEAN) !== 0) {
          set_signal_status(reaction, MAYBE_DIRTY);
        }
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
  function update_reaction(reaction) {
    var _a;
    var previous_deps = new_deps;
    var previous_skipped_deps = skipped_deps;
    var previous_untracked_writes = untracked_writes;
    var previous_reaction = active_reaction;
    var previous_skip_reaction = skip_reaction;
    var prev_derived_sources = derived_sources;
    var previous_component_context = component_context;
    var previous_untracking = untracking;
    var flags = reaction.f;
    new_deps = /** @type {null | Value[]} */
    null;
    skipped_deps = 0;
    untracked_writes = null;
    skip_reaction = (flags & UNOWNED) !== 0 && (untracking || !is_updating_effect || active_reaction === null);
    active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
    derived_sources = null;
    set_component_context(reaction.ctx);
    untracking = false;
    read_version++;
    try {
      var result = (
        /** @type {Function} */
        (0, reaction.fn)()
      );
      var deps = reaction.deps;
      if (new_deps !== null) {
        var i;
        remove_reactions(reaction, skipped_deps);
        if (deps !== null && skipped_deps > 0) {
          deps.length = skipped_deps + new_deps.length;
          for (i = 0; i < new_deps.length; i++) {
            deps[skipped_deps + i] = new_deps[i];
          }
        } else {
          reaction.deps = deps = new_deps;
        }
        if (!skip_reaction) {
          for (i = skipped_deps; i < deps.length; i++) {
            ((_a = deps[i]).reactions ?? (_a.reactions = [])).push(reaction);
          }
        }
      } else if (deps !== null && skipped_deps < deps.length) {
        remove_reactions(reaction, skipped_deps);
        deps.length = skipped_deps;
      }
      if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
        for (i = 0; i < /** @type {Source[]} */
        untracked_writes.length; i++) {
          schedule_possible_effect_self_invalidation(
            untracked_writes[i],
            /** @type {Effect} */
            reaction
          );
        }
      }
      if (previous_reaction !== null) {
        read_version++;
      }
      return result;
    } finally {
      new_deps = previous_deps;
      skipped_deps = previous_skipped_deps;
      untracked_writes = previous_untracked_writes;
      active_reaction = previous_reaction;
      skip_reaction = previous_skip_reaction;
      derived_sources = prev_derived_sources;
      set_component_context(previous_component_context);
      untracking = previous_untracking;
    }
  }
  function remove_reaction(signal, dependency) {
    let reactions = dependency.reactions;
    if (reactions !== null) {
      var index2 = index_of.call(reactions, signal);
      if (index2 !== -1) {
        var new_length = reactions.length - 1;
        if (new_length === 0) {
          reactions = dependency.reactions = null;
        } else {
          reactions[index2] = reactions[new_length];
          reactions.pop();
        }
      }
    }
    if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
    // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
    // allows us to skip the expensive work of disconnecting and immediately reconnecting it
    (new_deps === null || !new_deps.includes(dependency))) {
      set_signal_status(dependency, MAYBE_DIRTY);
      if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
        dependency.f ^= DISCONNECTED;
      }
      destroy_derived_effects(
        /** @type {Derived} **/
        dependency
      );
      remove_reactions(
        /** @type {Derived} **/
        dependency,
        0
      );
    }
  }
  function remove_reactions(signal, start_index) {
    var dependencies = signal.deps;
    if (dependencies === null) return;
    for (var i = start_index; i < dependencies.length; i++) {
      remove_reaction(signal, dependencies[i]);
    }
  }
  function update_effect(effect2) {
    var flags = effect2.f;
    if ((flags & DESTROYED) !== 0) {
      return;
    }
    set_signal_status(effect2, CLEAN);
    var previous_effect = active_effect;
    var previous_component_context = component_context;
    var was_updating_effect = is_updating_effect;
    active_effect = effect2;
    is_updating_effect = true;
    {
      var previous_component_fn = dev_current_component_function;
      set_dev_current_component_function(effect2.component_function);
    }
    try {
      if ((flags & BLOCK_EFFECT) !== 0) {
        destroy_block_effect_children(effect2);
      } else {
        destroy_effect_children(effect2);
      }
      execute_effect_teardown(effect2);
      var teardown2 = update_reaction(effect2);
      effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
      effect2.wv = write_version;
      var deps = effect2.deps;
      var dep;
      if (DEV && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && deps !== null) ;
      if (DEV) {
        dev_effect_stack.push(effect2);
      }
    } catch (error) {
      handle_error(error, effect2, previous_effect, previous_component_context || effect2.ctx);
    } finally {
      is_updating_effect = was_updating_effect;
      active_effect = previous_effect;
      {
        set_dev_current_component_function(previous_component_fn);
      }
    }
  }
  function log_effect_stack() {
    console.error(
      "Last ten effects were: ",
      dev_effect_stack.slice(-10).map((d) => d.fn)
    );
    dev_effect_stack = [];
  }
  function infinite_loop_guard() {
    try {
      effect_update_depth_exceeded();
    } catch (error) {
      {
        define_property(error, "stack", {
          value: ""
        });
      }
      if (last_scheduled_effect !== null) {
        {
          try {
            handle_error(error, last_scheduled_effect, null, null);
          } catch (e) {
            log_effect_stack();
            throw e;
          }
        }
      } else {
        {
          log_effect_stack();
        }
        throw error;
      }
    }
  }
  function flush_queued_root_effects() {
    try {
      var flush_count = 0;
      while (queued_root_effects.length > 0) {
        if (flush_count++ > 1e3) {
          infinite_loop_guard();
        }
        var root_effects = queued_root_effects;
        var length = root_effects.length;
        queued_root_effects = [];
        for (var i = 0; i < length; i++) {
          var root2 = root_effects[i];
          if ((root2.f & CLEAN) === 0) {
            root2.f ^= CLEAN;
          }
          var collected_effects = process_effects(root2);
          flush_queued_effects(collected_effects);
        }
      }
    } finally {
      is_flushing = false;
      last_scheduled_effect = null;
      {
        dev_effect_stack = [];
      }
    }
  }
  function flush_queued_effects(effects) {
    var length = effects.length;
    if (length === 0) return;
    for (var i = 0; i < length; i++) {
      var effect2 = effects[i];
      if ((effect2.f & (DESTROYED | INERT)) === 0) {
        try {
          if (check_dirtiness(effect2)) {
            update_effect(effect2);
            if (effect2.deps === null && effect2.first === null && effect2.nodes_start === null) {
              if (effect2.teardown === null) {
                unlink_effect(effect2);
              } else {
                effect2.fn = null;
              }
            }
          }
        } catch (error) {
          handle_error(error, effect2, null, effect2.ctx);
        }
      }
    }
  }
  function schedule_effect(signal) {
    if (!is_flushing) {
      is_flushing = true;
      queueMicrotask(flush_queued_root_effects);
    }
    var effect2 = last_scheduled_effect = signal;
    while (effect2.parent !== null) {
      effect2 = effect2.parent;
      var flags = effect2.f;
      if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
        if ((flags & CLEAN) === 0) return;
        effect2.f ^= CLEAN;
      }
    }
    queued_root_effects.push(effect2);
  }
  function process_effects(root2) {
    var effects = [];
    var effect2 = root2.first;
    while (effect2 !== null) {
      var flags = effect2.f;
      var is_branch = (flags & BRANCH_EFFECT) !== 0;
      var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
      if (!is_skippable_branch && (flags & INERT) === 0) {
        if ((flags & EFFECT) !== 0) {
          effects.push(effect2);
        } else if (is_branch) {
          effect2.f ^= CLEAN;
        } else {
          var previous_active_reaction = active_reaction;
          try {
            active_reaction = effect2;
            if (check_dirtiness(effect2)) {
              update_effect(effect2);
            }
          } catch (error) {
            handle_error(error, effect2, null, effect2.ctx);
          } finally {
            active_reaction = previous_active_reaction;
          }
        }
        var child2 = effect2.first;
        if (child2 !== null) {
          effect2 = child2;
          continue;
        }
      }
      var parent = effect2.parent;
      effect2 = effect2.next;
      while (effect2 === null && parent !== null) {
        effect2 = parent.next;
        parent = parent.parent;
      }
    }
    return effects;
  }
  function get(signal) {
    var flags = signal.f;
    var is_derived = (flags & DERIVED) !== 0;
    if (active_reaction !== null && !untracking) {
      if (derived_sources !== null && derived_sources.includes(signal)) {
        state_unsafe_local_read();
      }
      var deps = active_reaction.deps;
      if (signal.rv < read_version) {
        signal.rv = read_version;
        if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
          skipped_deps++;
        } else if (new_deps === null) {
          new_deps = [signal];
        } else if (!skip_reaction || !new_deps.includes(signal)) {
          new_deps.push(signal);
        }
      }
    } else if (is_derived && /** @type {Derived} */
    signal.deps === null && /** @type {Derived} */
    signal.effects === null) {
      var derived2 = (
        /** @type {Derived} */
        signal
      );
      var parent = derived2.parent;
      if (parent !== null && (parent.f & UNOWNED) === 0) {
        derived2.f ^= UNOWNED;
      }
    }
    if (is_derived) {
      derived2 = /** @type {Derived} */
      signal;
      if (check_dirtiness(derived2)) {
        update_derived(derived2);
      }
    }
    return signal.v;
  }
  function untrack(fn) {
    var previous_untracking = untracking;
    try {
      untracking = true;
      return fn();
    } finally {
      untracking = previous_untracking;
    }
  }
  const STATUS_MASK = -7169;
  function set_signal_status(signal, status) {
    signal.f = signal.f & STATUS_MASK | status;
  }
  function deep_read_state(value) {
    if (typeof value !== "object" || !value || value instanceof EventTarget) {
      return;
    }
    if (STATE_SYMBOL in value) {
      deep_read(value);
    } else if (!Array.isArray(value)) {
      for (let key in value) {
        const prop2 = value[key];
        if (typeof prop2 === "object" && prop2 && STATE_SYMBOL in prop2) {
          deep_read(prop2);
        }
      }
    }
  }
  function deep_read(value, visited = /* @__PURE__ */ new Set()) {
    if (typeof value === "object" && value !== null && // We don't want to traverse DOM elements
    !(value instanceof EventTarget) && !visited.has(value)) {
      visited.add(value);
      if (value instanceof Date) {
        value.getTime();
      }
      for (let key in value) {
        try {
          deep_read(value[key], visited);
        } catch (e) {
        }
      }
      const proto = get_prototype_of(value);
      if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
        const descriptors = get_descriptors(proto);
        for (let key in descriptors) {
          const get2 = descriptors[key].get;
          if (get2) {
            try {
              get2.call(value);
            } catch (e) {
            }
          }
        }
      }
    }
  }
  function validate_effect(rune) {
    if (active_effect === null && active_reaction === null) {
      effect_orphan(rune);
    }
    if (active_reaction !== null && (active_reaction.f & UNOWNED) !== 0 && active_effect === null) {
      effect_in_unowned_derived();
    }
    if (is_destroying_effect) {
      effect_in_teardown(rune);
    }
  }
  function push_effect(effect2, parent_effect) {
    var parent_last = parent_effect.last;
    if (parent_last === null) {
      parent_effect.last = parent_effect.first = effect2;
    } else {
      parent_last.next = effect2;
      effect2.prev = parent_last;
      parent_effect.last = effect2;
    }
  }
  function create_effect(type, fn, sync, push2 = true) {
    var is_root = (type & ROOT_EFFECT) !== 0;
    var parent_effect = active_effect;
    {
      while (parent_effect !== null && (parent_effect.f & INSPECT_EFFECT) !== 0) {
        parent_effect = parent_effect.parent;
      }
    }
    var effect2 = {
      ctx: component_context,
      deps: null,
      nodes_start: null,
      nodes_end: null,
      f: type | DIRTY,
      first: null,
      fn,
      last: null,
      next: null,
      parent: is_root ? null : parent_effect,
      prev: null,
      teardown: null,
      transitions: null,
      wv: 0
    };
    {
      effect2.component_function = dev_current_component_function;
    }
    if (sync) {
      try {
        update_effect(effect2);
        effect2.f |= EFFECT_RAN;
      } catch (e) {
        destroy_effect(effect2);
        throw e;
      }
    } else if (fn !== null) {
      schedule_effect(effect2);
    }
    var inert = sync && effect2.deps === null && effect2.first === null && effect2.nodes_start === null && effect2.teardown === null && (effect2.f & (EFFECT_HAS_DERIVED | BOUNDARY_EFFECT)) === 0;
    if (!inert && !is_root && push2) {
      if (parent_effect !== null) {
        push_effect(effect2, parent_effect);
      }
      if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
        var derived2 = (
          /** @type {Derived} */
          active_reaction
        );
        (derived2.effects ?? (derived2.effects = [])).push(effect2);
      }
    }
    return effect2;
  }
  function teardown(fn) {
    const effect2 = create_effect(RENDER_EFFECT, null, false);
    set_signal_status(effect2, CLEAN);
    effect2.teardown = fn;
    return effect2;
  }
  function user_effect(fn) {
    validate_effect("$effect");
    var defer = active_effect !== null && (active_effect.f & BRANCH_EFFECT) !== 0 && component_context !== null && !component_context.m;
    {
      define_property(fn, "name", {
        value: "$effect"
      });
    }
    if (defer) {
      var context = (
        /** @type {ComponentContext} */
        component_context
      );
      (context.e ?? (context.e = [])).push({
        fn,
        effect: active_effect,
        reaction: active_reaction
      });
    } else {
      var signal = effect(fn);
      return signal;
    }
  }
  function user_pre_effect(fn) {
    validate_effect("$effect.pre");
    {
      define_property(fn, "name", {
        value: "$effect.pre"
      });
    }
    return render_effect(fn);
  }
  function component_root(fn) {
    const effect2 = create_effect(ROOT_EFFECT, fn, true);
    return (options = {}) => {
      return new Promise((fulfil) => {
        if (options.outro) {
          pause_effect(effect2, () => {
            destroy_effect(effect2);
            fulfil(void 0);
          });
        } else {
          destroy_effect(effect2);
          fulfil(void 0);
        }
      });
    };
  }
  function effect(fn) {
    return create_effect(EFFECT, fn, false);
  }
  function render_effect(fn) {
    return create_effect(RENDER_EFFECT, fn, true);
  }
  function template_effect(fn, thunks = [], d = derived) {
    const deriveds = thunks.map(d);
    const effect2 = () => fn(...deriveds.map(get));
    {
      define_property(effect2, "name", {
        value: "{expression}"
      });
    }
    return block(effect2);
  }
  function block(fn, flags = 0) {
    return create_effect(RENDER_EFFECT | BLOCK_EFFECT | flags, fn, true);
  }
  function branch(fn, push2 = true) {
    return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push2);
  }
  function execute_effect_teardown(effect2) {
    var teardown2 = effect2.teardown;
    if (teardown2 !== null) {
      const previously_destroying_effect = is_destroying_effect;
      const previous_reaction = active_reaction;
      set_is_destroying_effect(true);
      set_active_reaction(null);
      try {
        teardown2.call(null);
      } finally {
        set_is_destroying_effect(previously_destroying_effect);
        set_active_reaction(previous_reaction);
      }
    }
  }
  function destroy_effect_children(signal, remove_dom = false) {
    var effect2 = signal.first;
    signal.first = signal.last = null;
    while (effect2 !== null) {
      var next = effect2.next;
      destroy_effect(effect2, remove_dom);
      effect2 = next;
    }
  }
  function destroy_block_effect_children(signal) {
    var effect2 = signal.first;
    while (effect2 !== null) {
      var next = effect2.next;
      if ((effect2.f & BRANCH_EFFECT) === 0) {
        destroy_effect(effect2);
      }
      effect2 = next;
    }
  }
  function destroy_effect(effect2, remove_dom = true) {
    var removed = false;
    if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes_start !== null) {
      var node = effect2.nodes_start;
      var end = effect2.nodes_end;
      while (node !== null) {
        var next = node === end ? null : (
          /** @type {TemplateNode} */
          /* @__PURE__ */ get_next_sibling(node)
        );
        node.remove();
        node = next;
      }
      removed = true;
    }
    destroy_effect_children(effect2, remove_dom && !removed);
    remove_reactions(effect2, 0);
    set_signal_status(effect2, DESTROYED);
    var transitions = effect2.transitions;
    if (transitions !== null) {
      for (const transition of transitions) {
        transition.stop();
      }
    }
    execute_effect_teardown(effect2);
    var parent = effect2.parent;
    if (parent !== null && parent.first !== null) {
      unlink_effect(effect2);
    }
    {
      effect2.component_function = null;
    }
    effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes_start = effect2.nodes_end = null;
  }
  function unlink_effect(effect2) {
    var parent = effect2.parent;
    var prev = effect2.prev;
    var next = effect2.next;
    if (prev !== null) prev.next = next;
    if (next !== null) next.prev = prev;
    if (parent !== null) {
      if (parent.first === effect2) parent.first = next;
      if (parent.last === effect2) parent.last = prev;
    }
  }
  function pause_effect(effect2, callback) {
    var transitions = [];
    pause_children(effect2, transitions, true);
    run_out_transitions(transitions, () => {
      destroy_effect(effect2);
      if (callback) callback();
    });
  }
  function run_out_transitions(transitions, fn) {
    var remaining = transitions.length;
    if (remaining > 0) {
      var check = () => --remaining || fn();
      for (var transition of transitions) {
        transition.out(check);
      }
    } else {
      fn();
    }
  }
  function pause_children(effect2, transitions, local) {
    if ((effect2.f & INERT) !== 0) return;
    effect2.f ^= INERT;
    if (effect2.transitions !== null) {
      for (const transition of effect2.transitions) {
        if (transition.is_global || local) {
          transitions.push(transition);
        }
      }
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      pause_children(child2, transitions, transparent ? local : false);
      child2 = sibling2;
    }
  }
  function resume_effect(effect2) {
    resume_children(effect2, true);
  }
  function resume_children(effect2, local) {
    if ((effect2.f & INERT) === 0) return;
    effect2.f ^= INERT;
    if ((effect2.f & CLEAN) === 0) {
      effect2.f ^= CLEAN;
    }
    if (check_dirtiness(effect2)) {
      set_signal_status(effect2, DIRTY);
      schedule_effect(effect2);
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      resume_children(child2, transparent ? local : false);
      child2 = sibling2;
    }
    if (effect2.transitions !== null) {
      for (const transition of effect2.transitions) {
        if (transition.is_global || local) {
          transition.in();
        }
      }
    }
  }
  const boundaries = {};
  const chrome_pattern = /at (?:.+ \()?(.+):(\d+):(\d+)\)?$/;
  const firefox_pattern = /@(.+):(\d+):(\d+)$/;
  function get_stack() {
    const stack2 = new Error().stack;
    if (!stack2) return null;
    const entries = [];
    for (const line of stack2.split("\n")) {
      let match = chrome_pattern.exec(line) ?? firefox_pattern.exec(line);
      if (match) {
        entries.push({
          file: match[1],
          line: +match[2],
          column: +match[3]
        });
      }
    }
    return entries;
  }
  function get_component() {
    var _a;
    const stack2 = (_a = get_stack()) == null ? void 0 : _a.slice(4);
    if (!stack2) return null;
    for (let i = 0; i < stack2.length; i++) {
      const entry = stack2[i];
      const modules = boundaries[entry.file];
      if (!modules) {
        if (i === 0) return null;
        continue;
      }
      for (const module of modules) {
        if (module.end == null) {
          return null;
        }
        if (module.start.line < entry.line && module.end.line > entry.line) {
          return module.component;
        }
      }
    }
    return null;
  }
  const ADD_OWNER = Symbol("ADD_OWNER");
  function mark_module_start() {
    var _a, _b;
    const start = (_a = get_stack()) == null ? void 0 : _a[2];
    if (start) {
      (boundaries[_b = start.file] ?? (boundaries[_b] = [])).push({
        start,
        // @ts-expect-error
        end: null,
        // @ts-expect-error we add the component at the end, since HMR will overwrite the function
        component: null
      });
    }
  }
  function mark_module_end(component) {
    var _a;
    const end = (_a = get_stack()) == null ? void 0 : _a[2];
    if (end) {
      const boundaries_file = boundaries[end.file];
      const boundary = boundaries_file[boundaries_file.length - 1];
      boundary.end = end;
      boundary.component = component;
    }
  }
  function add_owner(object2, owner, global = false, skip_warning = false) {
    if (object2 && !global) {
      const component = dev_current_component_function;
      const metadata = object2[STATE_SYMBOL_METADATA];
      if (metadata && !has_owner(metadata, component)) {
        let original = get_owner(metadata);
        if (owner && owner[FILENAME] !== component[FILENAME] && !skip_warning) {
          ownership_invalid_binding(component[FILENAME], owner[FILENAME], original[FILENAME]);
        }
      }
    }
    add_owner_to_object(object2, owner, /* @__PURE__ */ new Set());
  }
  function add_owner_effect(get_object, Component, skip_warning = false) {
    user_pre_effect(() => {
      add_owner(get_object(), Component, false, skip_warning);
    });
  }
  function widen_ownership(from, to) {
    if (to.owners === null) {
      return;
    }
    while (from) {
      if (from.owners === null) {
        to.owners = null;
        break;
      }
      for (const owner of from.owners) {
        to.owners.add(owner);
      }
      from = from.parent;
    }
  }
  function add_owner_to_object(object2, owner, seen) {
    var _a;
    const metadata = (
      /** @type {ProxyMetadata} */
      object2 == null ? void 0 : object2[STATE_SYMBOL_METADATA]
    );
    if (metadata) {
      if ("owners" in metadata && metadata.owners != null) {
        if (owner) {
          metadata.owners.add(owner);
        } else {
          metadata.owners = null;
        }
      }
    } else if (object2 && typeof object2 === "object") {
      if (seen.has(object2)) return;
      seen.add(object2);
      if (ADD_OWNER in object2 && object2[ADD_OWNER]) {
        render_effect(() => {
          object2[ADD_OWNER](owner);
        });
      } else {
        var proto = get_prototype_of(object2);
        if (proto === Object.prototype) {
          for (const key in object2) {
            if ((_a = Object.getOwnPropertyDescriptor(object2, key)) == null ? void 0 : _a.get) {
              let current = UNINITIALIZED;
              render_effect(() => {
                const next = object2[key];
                if (current !== next) {
                  current = next;
                  add_owner_to_object(next, owner, seen);
                }
              });
            } else {
              add_owner_to_object(object2[key], owner, seen);
            }
          }
        } else if (proto === Array.prototype) {
          for (let i = 0; i < object2.length; i += 1) {
            add_owner_to_object(object2[i], owner, seen);
          }
        }
      }
    }
  }
  function has_owner(metadata, component) {
    if (metadata.owners === null) {
      return true;
    }
    return metadata.owners.has(component) || // This helps avoid false positives when using HMR, where the component function is replaced
    FILENAME in component && [...metadata.owners].some(
      (owner) => (
        /** @type {any} */
        owner[FILENAME] === component[FILENAME]
      )
    ) || metadata.parent !== null && has_owner(metadata.parent, component);
  }
  function get_owner(metadata) {
    var _a;
    return ((_a = metadata == null ? void 0 : metadata.owners) == null ? void 0 : _a.values().next().value) ?? get_owner(
      /** @type {ProxyMetadata} */
      metadata.parent
    );
  }
  function check_ownership(metadata) {
    const component = get_component();
    if (component && !has_owner(metadata, component)) {
      let original = get_owner(metadata);
      if (original[FILENAME] !== component[FILENAME]) {
        ownership_invalid_mutation(component[FILENAME], original[FILENAME]);
      } else {
        ownership_invalid_mutation();
      }
    }
  }
  let component_context = null;
  function set_component_context(context) {
    component_context = context;
  }
  let dev_current_component_function = null;
  function set_dev_current_component_function(fn) {
    dev_current_component_function = fn;
  }
  function push(props, runes = false, fn) {
    component_context = {
      p: component_context,
      c: null,
      e: null,
      m: false,
      s: props,
      x: null,
      l: null
    };
    if (legacy_mode_flag && !runes) {
      component_context.l = {
        s: null,
        u: null,
        r1: [],
        r2: source(false)
      };
    }
    {
      component_context.function = fn;
      dev_current_component_function = fn;
    }
  }
  function pop(component) {
    var _a;
    const context_stack_item = component_context;
    if (context_stack_item !== null) {
      if (component !== void 0) {
        context_stack_item.x = component;
      }
      const component_effects = context_stack_item.e;
      if (component_effects !== null) {
        var previous_effect = active_effect;
        var previous_reaction = active_reaction;
        context_stack_item.e = null;
        try {
          for (var i = 0; i < component_effects.length; i++) {
            var component_effect = component_effects[i];
            set_active_effect(component_effect.effect);
            set_active_reaction(component_effect.reaction);
            effect(component_effect.fn);
          }
        } finally {
          set_active_effect(previous_effect);
          set_active_reaction(previous_reaction);
        }
      }
      component_context = context_stack_item.p;
      {
        dev_current_component_function = ((_a = context_stack_item.p) == null ? void 0 : _a.function) ?? null;
      }
      context_stack_item.m = true;
    }
    return component || /** @type {T} */
    {};
  }
  function is_runes() {
    return !legacy_mode_flag || component_context !== null && component_context.l === null;
  }
  const PASSIVE_EVENTS = ["touchstart", "touchmove"];
  function is_passive_event(name) {
    return PASSIVE_EVENTS.includes(name);
  }
  function add_locations(fn, filename, locations) {
    return (...args) => {
      const dom = fn(...args);
      var node = dom.nodeType === 11 ? dom.firstChild : dom;
      assign_locations(node, filename, locations);
      return dom;
    };
  }
  function assign_location(element, filename, location) {
    element.__svelte_meta = {
      loc: { file: filename, line: location[0], column: location[1] }
    };
    if (location[2]) {
      assign_locations(element.firstChild, filename, location[2]);
    }
  }
  function assign_locations(node, filename, locations) {
    var i = 0;
    while (node && i < locations.length) {
      if (node.nodeType === 1) {
        assign_location(
          /** @type {Element} */
          node,
          filename,
          locations[i++]
        );
      }
      node = node.nextSibling;
    }
  }
  let listening_to_form_reset = false;
  function add_form_reset_listener() {
    if (!listening_to_form_reset) {
      listening_to_form_reset = true;
      document.addEventListener(
        "reset",
        (evt) => {
          Promise.resolve().then(() => {
            var _a;
            if (!evt.defaultPrevented) {
              for (
                const e of
                /**@type {HTMLFormElement} */
                evt.target.elements
              ) {
                (_a = e.__on_r) == null ? void 0 : _a.call(e);
              }
            }
          });
        },
        // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
        { capture: true }
      );
    }
  }
  function listen(target, events, handler, call_handler_immediately = true) {
    if (call_handler_immediately) {
      handler();
    }
    for (var name of events) {
      target.addEventListener(name, handler);
    }
    teardown(() => {
      for (var name2 of events) {
        target.removeEventListener(name2, handler);
      }
    });
  }
  function without_reactive_context(fn) {
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      return fn();
    } finally {
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  function listen_to_event_and_reset_event(element, event2, handler, on_reset = handler) {
    element.addEventListener(event2, () => without_reactive_context(handler));
    const prev = element.__on_r;
    if (prev) {
      element.__on_r = () => {
        prev();
        on_reset(true);
      };
    } else {
      element.__on_r = () => on_reset(true);
    }
    add_form_reset_listener();
  }
  const all_registered_events = /* @__PURE__ */ new Set();
  const root_event_handles = /* @__PURE__ */ new Set();
  function create_event(event_name, dom, handler, options = {}) {
    function target_handler(event2) {
      if (!options.capture) {
        handle_event_propagation.call(dom, event2);
      }
      if (!event2.cancelBubble) {
        return without_reactive_context(() => {
          return handler == null ? void 0 : handler.call(this, event2);
        });
      }
    }
    if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
      queue_micro_task(() => {
        dom.addEventListener(event_name, target_handler, options);
      });
    } else {
      dom.addEventListener(event_name, target_handler, options);
    }
    return target_handler;
  }
  function event(event_name, dom, handler, capture, passive) {
    var options = { capture, passive };
    var target_handler = create_event(event_name, dom, handler, options);
    if (dom === document.body || dom === window || dom === document) {
      teardown(() => {
        dom.removeEventListener(event_name, target_handler, options);
      });
    }
  }
  function delegate(events) {
    for (var i = 0; i < events.length; i++) {
      all_registered_events.add(events[i]);
    }
    for (var fn of root_event_handles) {
      fn(events);
    }
  }
  function handle_event_propagation(event2) {
    var _a;
    var handler_element = this;
    var owner_document = (
      /** @type {Node} */
      handler_element.ownerDocument
    );
    var event_name = event2.type;
    var path = ((_a = event2.composedPath) == null ? void 0 : _a.call(event2)) || [];
    var current_target = (
      /** @type {null | Element} */
      path[0] || event2.target
    );
    var path_idx = 0;
    var handled_at = event2.__root;
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
      window)) {
        event2.__root = handler_element;
        return;
      }
      var handler_idx = path.indexOf(handler_element);
      if (handler_idx === -1) {
        return;
      }
      if (at_idx <= handler_idx) {
        path_idx = at_idx;
      }
    }
    current_target = /** @type {Element} */
    path[path_idx] || event2.target;
    if (current_target === handler_element) return;
    define_property(event2, "currentTarget", {
      configurable: true,
      get() {
        return current_target || owner_document;
      }
    });
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      var throw_error;
      var other_errors = [];
      while (current_target !== null) {
        var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
        current_target.host || null;
        try {
          var delegated = current_target["__" + event_name];
          if (delegated !== void 0 && (!/** @type {any} */
          current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          event2.target === current_target)) {
            if (is_array(delegated)) {
              var [fn, ...data2] = delegated;
              fn.apply(current_target, [event2, ...data2]);
            } else {
              delegated.call(current_target, event2);
            }
          }
        } catch (error) {
          if (throw_error) {
            other_errors.push(error);
          } else {
            throw_error = error;
          }
        }
        if (event2.cancelBubble || parent_element === handler_element || parent_element === null) {
          break;
        }
        current_target = parent_element;
      }
      if (throw_error) {
        for (let error of other_errors) {
          queueMicrotask(() => {
            throw error;
          });
        }
        throw throw_error;
      }
    } finally {
      event2.__root = handler_element;
      delete event2.currentTarget;
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  function create_fragment_from_html(html) {
    var elem = document.createElement("template");
    elem.innerHTML = html;
    return elem.content;
  }
  function assign_nodes(start, end) {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if (effect2.nodes_start === null) {
      effect2.nodes_start = start;
      effect2.nodes_end = end;
    }
  }
  // @__NO_SIDE_EFFECTS__
  function template2(content, flags) {
    var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
    var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;
    var node;
    var has_start = !content.startsWith("<!>");
    return () => {
      if (node === void 0) {
        node = create_fragment_from_html(has_start ? content : "<!>" + content);
        if (!is_fragment) node = /** @type {Node} */
        /* @__PURE__ */ get_first_child(node);
      }
      var clone = (
        /** @type {TemplateNode} */
        use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
      );
      if (is_fragment) {
        var start = (
          /** @type {TemplateNode} */
          /* @__PURE__ */ get_first_child(clone)
        );
        var end = (
          /** @type {TemplateNode} */
          clone.lastChild
        );
        assign_nodes(start, end);
      } else {
        assign_nodes(clone, clone);
      }
      return clone;
    };
  }
  // @__NO_SIDE_EFFECTS__
  function ns_template(content, flags, ns = "svg") {
    var has_start = !content.startsWith("<!>");
    var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
    var wrapped = `<${ns}>${has_start ? content : "<!>" + content}</${ns}>`;
    var node;
    return () => {
      if (!node) {
        var fragment = (
          /** @type {DocumentFragment} */
          create_fragment_from_html(wrapped)
        );
        var root2 = (
          /** @type {Element} */
          /* @__PURE__ */ get_first_child(fragment)
        );
        if (is_fragment) {
          node = document.createDocumentFragment();
          while (/* @__PURE__ */ get_first_child(root2)) {
            node.appendChild(
              /** @type {Node} */
              /* @__PURE__ */ get_first_child(root2)
            );
          }
        } else {
          node = /** @type {Element} */
          /* @__PURE__ */ get_first_child(root2);
        }
      }
      var clone = (
        /** @type {TemplateNode} */
        node.cloneNode(true)
      );
      if (is_fragment) {
        var start = (
          /** @type {TemplateNode} */
          /* @__PURE__ */ get_first_child(clone)
        );
        var end = (
          /** @type {TemplateNode} */
          clone.lastChild
        );
        assign_nodes(start, end);
      } else {
        assign_nodes(clone, clone);
      }
      return clone;
    };
  }
  function comment() {
    var frag = document.createDocumentFragment();
    var start = document.createComment("");
    var anchor = create_text();
    frag.append(start, anchor);
    assign_nodes(start, anchor);
    return frag;
  }
  function append(anchor, dom) {
    if (anchor === null) {
      return;
    }
    anchor.before(
      /** @type {Node} */
      dom
    );
  }
  function set_text(text, value) {
    var str = value == null ? "" : typeof value === "object" ? value + "" : value;
    if (str !== (text.__t ?? (text.__t = text.nodeValue))) {
      text.__t = str;
      text.nodeValue = str + "";
    }
  }
  function mount(component, options) {
    return _mount(component, options);
  }
  const document_listeners = /* @__PURE__ */ new Map();
  function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
    init_operations();
    var registered_events = /* @__PURE__ */ new Set();
    var event_handle = (events2) => {
      for (var i = 0; i < events2.length; i++) {
        var event_name = events2[i];
        if (registered_events.has(event_name)) continue;
        registered_events.add(event_name);
        var passive = is_passive_event(event_name);
        target.addEventListener(event_name, handle_event_propagation, { passive });
        var n = document_listeners.get(event_name);
        if (n === void 0) {
          document.addEventListener(event_name, handle_event_propagation, { passive });
          document_listeners.set(event_name, 1);
        } else {
          document_listeners.set(event_name, n + 1);
        }
      }
    };
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    var component = void 0;
    var unmount = component_root(() => {
      var anchor_node = anchor ?? target.appendChild(create_text());
      branch(() => {
        if (context) {
          push({});
          var ctx = (
            /** @type {ComponentContext} */
            component_context
          );
          ctx.c = context;
        }
        if (events) {
          props.$$events = events;
        }
        component = Component(anchor_node, props) || {};
        if (context) {
          pop();
        }
      });
      return () => {
        var _a;
        for (var event_name of registered_events) {
          target.removeEventListener(event_name, handle_event_propagation);
          var n = (
            /** @type {number} */
            document_listeners.get(event_name)
          );
          if (--n === 0) {
            document.removeEventListener(event_name, handle_event_propagation);
            document_listeners.delete(event_name);
          } else {
            document_listeners.set(event_name, n);
          }
        }
        root_event_handles.delete(event_handle);
        if (anchor_node !== anchor) {
          (_a = anchor_node.parentNode) == null ? void 0 : _a.removeChild(anchor_node);
        }
      };
    });
    mounted_components.set(component, unmount);
    return component;
  }
  let mounted_components = /* @__PURE__ */ new WeakMap();
  function check_target(target) {
    if (target) {
      component_api_invalid_new(target[FILENAME] ?? "a component", target.name);
    }
  }
  function legacy_api() {
    const component = component_context == null ? void 0 : component_context.function;
    function error(method) {
      var _a;
      const parent = ((_a = get_component()) == null ? void 0 : _a[FILENAME]) ?? "Something";
      component_api_changed(parent, method, component[FILENAME]);
    }
    return {
      $destroy: () => error("$destroy()"),
      $on: () => error("$on(...)"),
      $set: () => error("$set(...)")
    };
  }
  function if_block(node, fn, [root_index, hydrate_index] = [0, 0]) {
    var anchor = node;
    var consequent_effect = null;
    var alternate_effect = null;
    var condition = UNINITIALIZED;
    var flags = root_index > 0 ? EFFECT_TRANSPARENT : 0;
    var has_branch = false;
    const set_branch = (fn2, flag = true) => {
      has_branch = true;
      update_branch(flag, fn2);
    };
    const update_branch = (new_condition, fn2) => {
      if (condition === (condition = new_condition)) return;
      if (condition) {
        if (consequent_effect) {
          resume_effect(consequent_effect);
        } else if (fn2) {
          consequent_effect = branch(() => fn2(anchor));
        }
        if (alternate_effect) {
          pause_effect(alternate_effect, () => {
            alternate_effect = null;
          });
        }
      } else {
        if (alternate_effect) {
          resume_effect(alternate_effect);
        } else if (fn2) {
          alternate_effect = branch(() => fn2(anchor, [root_index + 1, hydrate_index]));
        }
        if (consequent_effect) {
          pause_effect(consequent_effect, () => {
            consequent_effect = null;
          });
        }
      }
    };
    block(() => {
      has_branch = false;
      fn(set_branch);
      if (!has_branch) {
        update_branch(null, null);
      }
    }, flags);
  }
  function index(_, i) {
    return i;
  }
  function pause_effects(state2, items, controlled_anchor, items_map) {
    var transitions = [];
    var length = items.length;
    for (var i = 0; i < length; i++) {
      pause_children(items[i].e, transitions, true);
    }
    var is_controlled = length > 0 && transitions.length === 0 && controlled_anchor !== null;
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        /** @type {Element} */
        controlled_anchor.parentNode
      );
      clear_text_content(parent_node);
      parent_node.append(
        /** @type {Element} */
        controlled_anchor
      );
      items_map.clear();
      link(state2, items[0].prev, items[length - 1].next);
    }
    run_out_transitions(transitions, () => {
      for (var i2 = 0; i2 < length; i2++) {
        var item = items[i2];
        if (!is_controlled) {
          items_map.delete(item.k);
          link(state2, item.prev, item.next);
        }
        destroy_effect(item.e, !is_controlled);
      }
    });
  }
  function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
    var anchor = node;
    var state2 = { flags, items: /* @__PURE__ */ new Map(), first: null };
    var fallback = null;
    var was_empty = false;
    var each_array = /* @__PURE__ */ derived_safe_equal(() => {
      var collection = get_collection();
      return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
    });
    block(() => {
      var array = get(each_array);
      var length = array.length;
      if (was_empty && length === 0) {
        return;
      }
      was_empty = length === 0;
      {
        reconcile(array, state2, anchor, render_fn, flags, get_key, get_collection);
      }
      if (fallback_fn !== null) {
        if (length === 0) {
          if (fallback) {
            resume_effect(fallback);
          } else {
            fallback = branch(() => fallback_fn(anchor));
          }
        } else if (fallback !== null) {
          pause_effect(fallback, () => {
            fallback = null;
          });
        }
      }
      get(each_array);
    });
  }
  function reconcile(array, state2, anchor, render_fn, flags, get_key, get_collection) {
    var length = array.length;
    var items = state2.items;
    var first = state2.first;
    var current = first;
    var seen;
    var prev = null;
    var matched = [];
    var stashed = [];
    var value;
    var key;
    var item;
    var i;
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key = get_key(value, i);
      item = items.get(key);
      if (item === void 0) {
        var child_anchor = current ? (
          /** @type {TemplateNode} */
          current.e.nodes_start
        ) : anchor;
        prev = create_item(
          child_anchor,
          state2,
          prev,
          prev === null ? state2.first : prev.next,
          value,
          key,
          i,
          render_fn,
          flags,
          get_collection
        );
        items.set(key, prev);
        matched = [];
        stashed = [];
        current = prev.next;
        continue;
      }
      {
        update_item(item, value, i);
      }
      if ((item.e.f & INERT) !== 0) {
        resume_effect(item.e);
      }
      if (item !== current) {
        if (seen !== void 0 && seen.has(item)) {
          if (matched.length < stashed.length) {
            var start = stashed[0];
            var j;
            prev = start.prev;
            var a = matched[0];
            var b = matched[matched.length - 1];
            for (j = 0; j < matched.length; j += 1) {
              move(matched[j], start, anchor);
            }
            for (j = 0; j < stashed.length; j += 1) {
              seen.delete(stashed[j]);
            }
            link(state2, a.prev, b.next);
            link(state2, prev, a);
            link(state2, b, start);
            current = start;
            prev = b;
            i -= 1;
            matched = [];
            stashed = [];
          } else {
            seen.delete(item);
            move(item, current, anchor);
            link(state2, item.prev, item.next);
            link(state2, item, prev === null ? state2.first : prev.next);
            link(state2, prev, item);
            prev = item;
          }
          continue;
        }
        matched = [];
        stashed = [];
        while (current !== null && current.k !== key) {
          if ((current.e.f & INERT) === 0) {
            (seen ?? (seen = /* @__PURE__ */ new Set())).add(current);
          }
          stashed.push(current);
          current = current.next;
        }
        if (current === null) {
          continue;
        }
        item = current;
      }
      matched.push(item);
      prev = item;
      current = item.next;
    }
    if (current !== null || seen !== void 0) {
      var to_destroy = seen === void 0 ? [] : array_from(seen);
      while (current !== null) {
        if ((current.e.f & INERT) === 0) {
          to_destroy.push(current);
        }
        current = current.next;
      }
      var destroy_length = to_destroy.length;
      if (destroy_length > 0) {
        var controlled_anchor = null;
        pause_effects(state2, to_destroy, controlled_anchor, items);
      }
    }
    active_effect.first = state2.first && state2.first.e;
    active_effect.last = prev && prev.e;
  }
  function update_item(item, value, index2, type) {
    {
      internal_set(item.v, value);
    }
    {
      item.i = index2;
    }
  }
  function create_item(anchor, state2, prev, next, value, key, index2, render_fn, flags, get_collection) {
    var reactive = (flags & EACH_ITEM_REACTIVE) !== 0;
    var mutable = (flags & EACH_ITEM_IMMUTABLE) === 0;
    var v = reactive ? mutable ? /* @__PURE__ */ mutable_source(value) : source(value) : value;
    var i = (flags & EACH_INDEX_REACTIVE) === 0 ? index2 : source(index2);
    {
      v.debug = () => {
        var collection_index = typeof i === "number" ? index2 : i.v;
        get_collection()[collection_index];
      };
    }
    var item = {
      i,
      v,
      k: key,
      a: null,
      // @ts-expect-error
      e: null,
      prev,
      next
    };
    try {
      item.e = branch(() => render_fn(anchor, v, i, get_collection), hydrating);
      item.e.prev = prev && prev.e;
      item.e.next = next && next.e;
      if (prev === null) {
        state2.first = item;
      } else {
        prev.next = item;
        prev.e.next = item.e;
      }
      if (next !== null) {
        next.prev = item;
        next.e.prev = item.e;
      }
      return item;
    } finally {
    }
  }
  function move(item, next, anchor) {
    var end = item.next ? (
      /** @type {TemplateNode} */
      item.next.e.nodes_start
    ) : anchor;
    var dest = next ? (
      /** @type {TemplateNode} */
      next.e.nodes_start
    ) : anchor;
    var node = (
      /** @type {TemplateNode} */
      item.e.nodes_start
    );
    while (node !== end) {
      var next_node = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      dest.before(node);
      node = next_node;
    }
  }
  function link(state2, prev, next) {
    if (prev === null) {
      state2.first = next;
    } else {
      prev.next = next;
      prev.e.next = next && next.e;
    }
    if (next !== null) {
      next.prev = prev;
      next.e.prev = prev && prev.e;
    }
  }
  function snippet(node, get_snippet, ...args) {
    var anchor = node;
    var snippet2 = noop;
    var snippet_effect;
    block(() => {
      if (snippet2 === (snippet2 = get_snippet())) return;
      if (snippet_effect) {
        destroy_effect(snippet_effect);
        snippet_effect = null;
      }
      if (snippet2 == null) {
        invalid_snippet();
      }
      snippet_effect = branch(() => (
        /** @type {SnippetFn} */
        snippet2(anchor, ...args)
      ));
    }, EFFECT_TRANSPARENT);
  }
  function wrap_snippet(component, fn) {
    return (node, ...args) => {
      var previous_component_function = dev_current_component_function;
      set_dev_current_component_function(component);
      try {
        return fn(node, ...args);
      } finally {
        set_dev_current_component_function(previous_component_function);
      }
    };
  }
  const whitespace = [..." 	\n\r\f \v\uFEFF"];
  function to_class(value, hash, directives) {
    var classname = value == null ? "" : "" + value;
    if (hash) {
      classname = classname ? classname + " " + hash : hash;
    }
    if (directives) {
      for (var key in directives) {
        if (directives[key]) {
          classname = classname ? classname + " " + key : key;
        } else if (classname.length) {
          var len = key.length;
          var a = 0;
          while ((a = classname.indexOf(key, a)) >= 0) {
            var b = a + len;
            if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
              classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
            } else {
              a = b;
            }
          }
        }
      }
    }
    return classname === "" ? null : classname;
  }
  function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
    var prev = dom.__className;
    if (prev !== value) {
      var next_class_name = to_class(value, hash, next_classes);
      {
        if (next_class_name == null) {
          dom.removeAttribute("class");
        } else if (is_html) {
          dom.className = next_class_name;
        } else {
          dom.setAttribute("class", next_class_name);
        }
      }
      dom.__className = value;
    } else if (next_classes) {
      for (var key in next_classes) {
        var is_present = !!next_classes[key];
        if (prev_classes == null || is_present !== !!prev_classes[key]) {
          dom.classList.toggle(key, is_present);
        }
      }
    }
    return next_classes;
  }
  function set_attribute(element, attribute, value, skip_warning) {
    var attributes = element.__attributes ?? (element.__attributes = {});
    if (attributes[attribute] === (attributes[attribute] = value)) return;
    if (attribute === "style" && "__styles" in element) {
      element.__styles = {};
    }
    if (attribute === "loading") {
      element[LOADING_ATTR_SYMBOL] = value;
    }
    if (value == null) {
      element.removeAttribute(attribute);
    } else if (typeof value !== "string" && get_setters(element).includes(attribute)) {
      element[attribute] = value;
    } else {
      element.setAttribute(attribute, value);
    }
  }
  function set_xlink_attribute(dom, attribute, value) {
    dom.setAttributeNS("http://www.w3.org/1999/xlink", attribute, value);
  }
  var setters_cache = /* @__PURE__ */ new Map();
  function get_setters(element) {
    var setters = setters_cache.get(element.nodeName);
    if (setters) return setters;
    setters_cache.set(element.nodeName, setters = []);
    var descriptors;
    var proto = element;
    var element_proto = Element.prototype;
    while (element_proto !== proto) {
      descriptors = get_descriptors(proto);
      for (var key in descriptors) {
        if (descriptors[key].set) {
          setters.push(key);
        }
      }
      proto = get_prototype_of(proto);
    }
    return setters;
  }
  function set_style(dom, key, value, important) {
    var styles = dom.__styles ?? (dom.__styles = {});
    if (styles[key] === value) {
      return;
    }
    styles[key] = value;
    if (value == null) {
      dom.style.removeProperty(key);
    } else {
      dom.style.setProperty(key, value, "");
    }
  }
  function bind_value(input, get2, set2 = get2) {
    var runes = is_runes();
    listen_to_event_and_reset_event(input, "input", (is_reset) => {
      if (input.type === "checkbox") {
        bind_invalid_checkbox_value();
      }
      var value = is_reset ? input.defaultValue : input.value;
      value = is_numberlike_input(input) ? to_number(value) : value;
      set2(value);
      if (runes && value !== (value = get2())) {
        var start = input.selectionStart;
        var end = input.selectionEnd;
        input.value = value ?? "";
        if (end !== null) {
          input.selectionStart = start;
          input.selectionEnd = Math.min(end, input.value.length);
        }
      }
    });
    if (
      // If we are hydrating and the value has since changed,
      // then use the updated value from the input instead.
      // If defaultValue is set, then value == defaultValue
      // TODO Svelte 6: remove input.value check and set to empty string?
      untrack(get2) == null && input.value
    ) {
      set2(is_numberlike_input(input) ? to_number(input.value) : input.value);
    }
    render_effect(() => {
      if (input.type === "checkbox") {
        bind_invalid_checkbox_value();
      }
      var value = get2();
      if (is_numberlike_input(input) && value === to_number(input.value)) {
        return;
      }
      if (input.type === "date" && !value && !input.value) {
        return;
      }
      if (value !== input.value) {
        input.value = value ?? "";
      }
    });
  }
  function is_numberlike_input(input) {
    var type = input.type;
    return type === "number" || type === "range";
  }
  function to_number(value) {
    return value === "" ? null : +value;
  }
  const _ResizeObserverSingleton = class _ResizeObserverSingleton {
    /** @param {ResizeObserverOptions} options */
    constructor(options) {
      __privateAdd(this, _ResizeObserverSingleton_instances);
      /** */
      __privateAdd(this, _listeners, /* @__PURE__ */ new WeakMap());
      /** @type {ResizeObserver | undefined} */
      __privateAdd(this, _observer);
      /** @type {ResizeObserverOptions} */
      __privateAdd(this, _options);
      __privateSet(this, _options, options);
    }
    /**
     * @param {Element} element
     * @param {(entry: ResizeObserverEntry) => any} listener
     */
    observe(element, listener) {
      var listeners = __privateGet(this, _listeners).get(element) || /* @__PURE__ */ new Set();
      listeners.add(listener);
      __privateGet(this, _listeners).set(element, listeners);
      __privateMethod(this, _ResizeObserverSingleton_instances, getObserver_fn).call(this).observe(element, __privateGet(this, _options));
      return () => {
        var listeners2 = __privateGet(this, _listeners).get(element);
        listeners2.delete(listener);
        if (listeners2.size === 0) {
          __privateGet(this, _listeners).delete(element);
          __privateGet(this, _observer).unobserve(element);
        }
      };
    }
  };
  _listeners = new WeakMap();
  _observer = new WeakMap();
  _options = new WeakMap();
  _ResizeObserverSingleton_instances = new WeakSet();
  getObserver_fn = function() {
    return __privateGet(this, _observer) ?? __privateSet(this, _observer, new ResizeObserver(
      /** @param {any} entries */
      (entries) => {
        for (var entry of entries) {
          _ResizeObserverSingleton.entries.set(entry.target, entry);
          for (var listener of __privateGet(this, _listeners).get(entry.target) || []) {
            listener(entry);
          }
        }
      }
    ));
  };
  /** @static */
  __publicField(_ResizeObserverSingleton, "entries", /* @__PURE__ */ new WeakMap());
  let ResizeObserverSingleton = _ResizeObserverSingleton;
  var resize_observer_border_box = /* @__PURE__ */ new ResizeObserverSingleton({
    box: "border-box"
  });
  function bind_element_size(element, type, set2) {
    var unsub = resize_observer_border_box.observe(element, () => set2(element[type]));
    effect(() => {
      untrack(() => set2(element[type]));
      return unsub;
    });
  }
  function is_bound_this(bound_value, element_or_component) {
    return bound_value === element_or_component || (bound_value == null ? void 0 : bound_value[STATE_SYMBOL]) === element_or_component;
  }
  function bind_this(element_or_component = {}, update2, get_value, get_parts) {
    effect(() => {
      var old_parts;
      var parts;
      render_effect(() => {
        old_parts = parts;
        parts = [];
        untrack(() => {
          if (element_or_component !== get_value(...parts)) {
            update2(element_or_component, ...parts);
            if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
              update2(null, ...old_parts);
            }
          }
        });
      });
      return () => {
        queue_micro_task(() => {
          if (parts && is_bound_this(get_value(...parts), element_or_component)) {
            update2(null, ...parts);
          }
        });
      };
    });
    return element_or_component;
  }
  function bind_window_size(type, set2) {
    listen(window, ["resize"], () => without_reactive_context(() => set2(window[type])));
  }
  function init(immutable = false) {
    const context = (
      /** @type {ComponentContextLegacy} */
      component_context
    );
    const callbacks = context.l.u;
    if (!callbacks) return;
    let props = () => deep_read_state(context.s);
    if (immutable) {
      let version = 0;
      let prev = (
        /** @type {Record<string, any>} */
        {}
      );
      const d = /* @__PURE__ */ derived(() => {
        let changed = false;
        const props2 = context.s;
        for (const key in props2) {
          if (props2[key] !== prev[key]) {
            prev[key] = props2[key];
            changed = true;
          }
        }
        if (changed) version++;
        return version;
      });
      props = () => get(d);
    }
    if (callbacks.b.length) {
      user_pre_effect(() => {
        observe_all(context, props);
        run_all(callbacks.b);
      });
    }
    user_effect(() => {
      const fns = untrack(() => callbacks.m.map(run));
      return () => {
        for (const fn of fns) {
          if (typeof fn === "function") {
            fn();
          }
        }
      };
    });
    if (callbacks.a.length) {
      user_effect(() => {
        observe_all(context, props);
        run_all(callbacks.a);
      });
    }
  }
  function observe_all(context, props) {
    if (context.l.s) {
      for (const signal of context.l.s) get(signal);
    }
    props();
  }
  function bubble_event($$props, event2) {
    var _a;
    var events = (
      /** @type {Record<string, Function[] | Function>} */
      (_a = $$props.$$events) == null ? void 0 : _a[event2.type]
    );
    var callbacks = is_array(events) ? events.slice() : events == null ? [] : [events];
    for (var fn of callbacks) {
      fn.call(this, event2);
    }
  }
  {
    let throw_rune_error = function(rune) {
      if (!(rune in globalThis)) {
        let value;
        Object.defineProperty(globalThis, rune, {
          configurable: true,
          // eslint-disable-next-line getter-return
          get: () => {
            if (value !== void 0) {
              return value;
            }
            rune_outside_svelte(rune);
          },
          set: (v) => {
            value = v;
          }
        });
      }
    };
    throw_rune_error("$state");
    throw_rune_error("$effect");
    throw_rune_error("$derived");
    throw_rune_error("$inspect");
    throw_rune_error("$props");
    throw_rune_error("$bindable");
  }
  let is_store_binding = false;
  function capture_store_binding(fn) {
    var previous_is_store_binding = is_store_binding;
    try {
      is_store_binding = false;
      return [fn(), is_store_binding];
    } finally {
      is_store_binding = previous_is_store_binding;
    }
  }
  function prop(props, key, flags, fallback) {
    var _a;
    var immutable = (flags & PROPS_IS_IMMUTABLE) !== 0;
    var runes = !legacy_mode_flag || (flags & PROPS_IS_RUNES) !== 0;
    var bindable = (flags & PROPS_IS_BINDABLE) !== 0;
    var lazy = (flags & PROPS_IS_LAZY_INITIAL) !== 0;
    var is_store_sub = false;
    var prop_value;
    if (bindable) {
      [prop_value, is_store_sub] = capture_store_binding(() => (
        /** @type {V} */
        props[key]
      ));
    } else {
      prop_value = /** @type {V} */
      props[key];
    }
    var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
    var setter = bindable && (((_a = get_descriptor(props, key)) == null ? void 0 : _a.set) ?? (is_entry_props && key in props && ((v) => props[key] = v))) || void 0;
    var fallback_value = (
      /** @type {V} */
      fallback
    );
    var fallback_dirty = true;
    var fallback_used = false;
    var get_fallback = () => {
      fallback_used = true;
      if (fallback_dirty) {
        fallback_dirty = false;
        if (lazy) {
          fallback_value = untrack(
            /** @type {() => V} */
            fallback
          );
        } else {
          fallback_value = /** @type {V} */
          fallback;
        }
      }
      return fallback_value;
    };
    if (prop_value === void 0 && fallback !== void 0) {
      if (setter && runes) {
        props_invalid_value(key);
      }
      prop_value = get_fallback();
      if (setter) setter(prop_value);
    }
    var getter;
    if (runes) {
      getter = () => {
        var value = (
          /** @type {V} */
          props[key]
        );
        if (value === void 0) return get_fallback();
        fallback_dirty = true;
        fallback_used = false;
        return value;
      };
    } else {
      var derived_getter = (immutable ? derived : derived_safe_equal)(
        () => (
          /** @type {V} */
          props[key]
        )
      );
      derived_getter.f |= LEGACY_DERIVED_PROP;
      getter = () => {
        var value = get(derived_getter);
        if (value !== void 0) fallback_value = /** @type {V} */
        void 0;
        return value === void 0 ? fallback_value : value;
      };
    }
    if ((flags & PROPS_IS_UPDATED) === 0) {
      return getter;
    }
    if (setter) {
      var legacy_parent = props.$$legacy;
      return function(value, mutation) {
        if (arguments.length > 0) {
          if (!runes || !mutation || legacy_parent || is_store_sub) {
            setter(mutation ? getter() : value);
          }
          return value;
        } else {
          return getter();
        }
      };
    }
    var from_child = false;
    var inner_current_value = /* @__PURE__ */ mutable_source(prop_value);
    var current_value = /* @__PURE__ */ derived(() => {
      var parent_value = getter();
      var child_value = get(inner_current_value);
      if (from_child) {
        from_child = false;
        return child_value;
      }
      return inner_current_value.v = parent_value;
    });
    if (!immutable) current_value.equals = safe_equals;
    return function(value, mutation) {
      if (arguments.length > 0) {
        const new_value = mutation ? get(current_value) : runes && bindable ? proxy(value) : value;
        if (!current_value.equals(new_value)) {
          from_child = true;
          set(inner_current_value, new_value);
          if (fallback_used && fallback_value !== void 0) {
            fallback_value = new_value;
          }
          untrack(() => get(current_value));
        }
        return value;
      }
      return get(current_value);
    };
  }
  const PUBLIC_VERSION = "5";
  if (typeof window !== "undefined")
    (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
  mark_module_start();
  Header[FILENAME] = "src/template/Header.svelte";
  var root$a = add_locations(/* @__PURE__ */ template2(`<div class="header svelte-1cps9pi"><h2 class="title svelte-1cps9pi"> </h2> <h3 class="subtitle svelte-1cps9pi"> </h3></div>`), Header[FILENAME], [[5, 0, [[6, 2], [7, 2]]]]);
  function Header($$anchor, $$props) {
    check_target(new.target);
    push($$props, true, Header);
    var div = root$a();
    var h2 = child(div);
    var text = child(h2);
    var h3 = sibling(h2, 2);
    var text_1 = child(h3);
    template_effect(() => {
      set_text(text, $$props.title);
      set_text(text_1, $$props.subtitle);
    });
    append($$anchor, div);
    return pop({ ...legacy_api() });
  }
  mark_module_end(Header);
  const logo = "data:image/png;base64,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";
  mark_module_start();
  Footer[FILENAME] = "src/template/Footer.svelte";
  var root_1$4 = add_locations(/* @__PURE__ */ template2(`<div class="logo svelte-g4y3d9"><img alt="World Bank logo" class="svelte-g4y3d9"></div>`), Footer[FILENAME], [[9, 4, [[9, 22]]]]);
  var root$9 = add_locations(/* @__PURE__ */ template2(`<div class="footer svelte-g4y3d9"><div class="notes svelte-g4y3d9"><span class="notes-title svelte-g4y3d9"> </span> </div> <!></div>`), Footer[FILENAME], [
    [6, 0, [[7, 4, [[7, 23]]]]]
  ]);
  function Footer($$anchor, $$props) {
    check_target(new.target);
    push($$props, true, Footer);
    var div = root$9();
    var div_1 = child(div);
    var span = child(div_1);
    var text = child(span);
    var text_1 = sibling(span, 1, true);
    var node = sibling(div_1, 2);
    {
      var consequent = ($$anchor2) => {
        var div_2 = root_1$4();
        var img = child(div_2);
        set_attribute(img, "src", logo);
        append($$anchor2, div_2);
      };
      if_block(node, ($$render) => {
        if ($$props.includeLogo) $$render(consequent);
      });
    }
    template_effect(() => {
      set_text(text, $$props.notesTitle);
      set_text(text_1, $$props.notes);
    });
    append($$anchor, div);
    return pop({ ...legacy_api() });
  }
  mark_module_end(Footer);
  const hexGrid = [
    {
      "q": 0,
      "r": 4,
      "iso3c": "CAN"
    },
    {
      "q": 0,
      "r": 5,
      "iso3c": "USA"
    },
    {
      "q": 0,
      "r": 6,
      "iso3c": "MEX"
    },
    {
      "q": 0,
      "r": 7,
      "iso3c": "GTM"
    },
    {
      "q": 0,
      "r": 12,
      "iso3c": "WSM"
    },
    {
      "q": 0,
      "r": 13,
      "iso3c": "ASM"
    },
    {
      "q": 0,
      "r": 14,
      "iso3c": "TON"
    },
    {
      "q": 1,
      "r": 7,
      "iso3c": "BLZ"
    },
    {
      "q": 1,
      "r": 8,
      "iso3c": "SLV"
    },
    {
      "q": 1,
      "r": 14,
      "iso3c": "PYF"
    },
    {
      "q": 2,
      "r": 5,
      "iso3c": "BHS"
    },
    {
      "q": 2,
      "r": 7,
      "iso3c": "HND"
    },
    {
      "q": 2,
      "r": 8,
      "iso3c": "NIC"
    },
    {
      "q": 3,
      "r": 5,
      "iso3c": "BMU"
    },
    {
      "q": 3,
      "r": 6,
      "iso3c": "CYM"
    },
    {
      "q": 3,
      "r": 9,
      "iso3c": "CRI"
    },
    {
      "q": 3,
      "r": 11,
      "iso3c": "ECU"
    },
    {
      "q": 4,
      "r": 5,
      "iso3c": "CUB"
    },
    {
      "q": 4,
      "r": 6,
      "iso3c": "JAM"
    },
    {
      "q": 4,
      "r": 9,
      "iso3c": "PAN"
    },
    {
      "q": 4,
      "r": 10,
      "iso3c": "COL"
    },
    {
      "q": 4,
      "r": 11,
      "iso3c": "PER"
    },
    {
      "q": 4,
      "r": 12,
      "iso3c": "CHL"
    },
    {
      "q": 5,
      "r": 5,
      "iso3c": "TCA"
    },
    {
      "q": 5,
      "r": 6,
      "iso3c": "HTI"
    },
    {
      "q": 5,
      "r": 8,
      "iso3c": "ABW"
    },
    {
      "q": 5,
      "r": 10,
      "iso3c": "VEN"
    },
    {
      "q": 5,
      "r": 11,
      "iso3c": "BRA"
    },
    {
      "q": 5,
      "r": 12,
      "iso3c": "BOL"
    },
    {
      "q": 5,
      "r": 13,
      "iso3c": "ARG"
    },
    {
      "q": 6,
      "r": 5,
      "iso3c": "PRI"
    },
    {
      "q": 6,
      "r": 6,
      "iso3c": "DOM"
    },
    {
      "q": 6,
      "r": 7,
      "iso3c": "CUW"
    },
    {
      "q": 6,
      "r": 10,
      "iso3c": "GUY"
    },
    {
      "q": 6,
      "r": 11,
      "iso3c": "URY"
    },
    {
      "q": 6,
      "r": 12,
      "iso3c": "PRY"
    },
    {
      "q": 7,
      "r": 11,
      "iso3c": "SUR"
    },
    {
      "q": 8,
      "r": 4,
      "iso3c": "MAF"
    },
    {
      "q": 8,
      "r": 5,
      "iso3c": "SXM"
    },
    {
      "q": 8,
      "r": 6,
      "iso3c": "VGB"
    },
    {
      "q": 8,
      "r": 7,
      "iso3c": "VIR"
    },
    {
      "q": 8,
      "r": 8,
      "iso3c": "KNA"
    },
    {
      "q": 8,
      "r": 9,
      "iso3c": "VCT"
    },
    {
      "q": 9,
      "r": 5,
      "iso3c": "ATG"
    },
    {
      "q": 9,
      "r": 6,
      "iso3c": "DMA"
    },
    {
      "q": 9,
      "r": 7,
      "iso3c": "LCA"
    },
    {
      "q": 9,
      "r": 8,
      "iso3c": "BRB"
    },
    {
      "q": 9,
      "r": 9,
      "iso3c": "GRD"
    },
    {
      "q": 9,
      "r": 10,
      "iso3c": "TTO"
    },
    {
      "q": 10,
      "r": 0,
      "iso3c": "GRL"
    },
    {
      "q": 11,
      "r": 2,
      "iso3c": "ISL"
    },
    {
      "q": 11,
      "r": 11,
      "iso3c": "CPV"
    },
    {
      "q": 12,
      "r": 3,
      "iso3c": "IMN"
    },
    {
      "q": 12,
      "r": 4,
      "iso3c": "IRL"
    },
    {
      "q": 12,
      "r": 7,
      "iso3c": "PRT"
    },
    {
      "q": 13,
      "r": 3,
      "iso3c": "FRO"
    },
    {
      "q": 13,
      "r": 4,
      "iso3c": "GBR"
    },
    {
      "q": 13,
      "r": 7,
      "iso3c": "ESP"
    },
    {
      "q": 13,
      "r": 8,
      "iso3c": "GIB"
    },
    {
      "q": 13,
      "r": 11,
      "iso3c": "GMB"
    },
    {
      "q": 13,
      "r": 12,
      "iso3c": "GIN"
    },
    {
      "q": 13,
      "r": 13,
      "iso3c": "SLE"
    },
    {
      "q": 14,
      "r": 6,
      "iso3c": "AND"
    },
    {
      "q": 14,
      "r": 10,
      "iso3c": "SEN"
    },
    {
      "q": 14,
      "r": 11,
      "iso3c": "GNB"
    },
    {
      "q": 14,
      "r": 12,
      "iso3c": "LBR"
    },
    {
      "q": 15,
      "r": 4,
      "iso3c": "NLD"
    },
    {
      "q": 15,
      "r": 5,
      "iso3c": "BEL"
    },
    {
      "q": 15,
      "r": 6,
      "iso3c": "FRA"
    },
    {
      "q": 15,
      "r": 7,
      "iso3c": "MCO"
    },
    {
      "q": 15,
      "r": 8,
      "iso3c": "SMR"
    },
    {
      "q": 15,
      "r": 10,
      "iso3c": "MRT"
    },
    {
      "q": 15,
      "r": 11,
      "iso3c": "MLI"
    },
    {
      "q": 15,
      "r": 12,
      "iso3c": "CIV"
    },
    {
      "q": 15,
      "r": 13,
      "iso3c": "GHA"
    },
    {
      "q": 15,
      "r": 16,
      "iso3c": "STP"
    },
    {
      "q": 16,
      "r": 3,
      "iso3c": "DNK"
    },
    {
      "q": 16,
      "r": 4,
      "iso3c": "DEU"
    },
    {
      "q": 16,
      "r": 5,
      "iso3c": "LUX"
    },
    {
      "q": 16,
      "r": 6,
      "iso3c": "CHE"
    },
    {
      "q": 16,
      "r": 7,
      "iso3c": "ITA"
    },
    {
      "q": 16,
      "r": 8,
      "iso3c": "MLT"
    },
    {
      "q": 16,
      "r": 10,
      "iso3c": "MAR"
    },
    {
      "q": 16,
      "r": 11,
      "iso3c": "BFA"
    },
    {
      "q": 16,
      "r": 12,
      "iso3c": "TGO"
    },
    {
      "q": 16,
      "r": 13,
      "iso3c": "NGA"
    },
    {
      "q": 17,
      "r": 3,
      "iso3c": "LTU"
    },
    {
      "q": 17,
      "r": 4,
      "iso3c": "POL"
    },
    {
      "q": 17,
      "r": 5,
      "iso3c": "CZE"
    },
    {
      "q": 17,
      "r": 6,
      "iso3c": "LIE"
    },
    {
      "q": 17,
      "r": 7,
      "iso3c": "SVN"
    },
    {
      "q": 17,
      "r": 8,
      "iso3c": "HRV"
    },
    {
      "q": 17,
      "r": 10,
      "iso3c": "DZA"
    },
    {
      "q": 17,
      "r": 11,
      "iso3c": "NER"
    },
    {
      "q": 17,
      "r": 12,
      "iso3c": "BEN"
    },
    {
      "q": 17,
      "r": 13,
      "iso3c": "GNQ"
    },
    {
      "q": 17,
      "r": 14,
      "iso3c": "GAB"
    },
    {
      "q": 18,
      "r": 0,
      "iso3c": "NOR"
    },
    {
      "q": 18,
      "r": 2,
      "iso3c": "LVA"
    },
    {
      "q": 18,
      "r": 3,
      "iso3c": "BLR"
    },
    {
      "q": 18,
      "r": 4,
      "iso3c": "UKR"
    },
    {
      "q": 18,
      "r": 5,
      "iso3c": "SVK"
    },
    {
      "q": 18,
      "r": 6,
      "iso3c": "AUT"
    },
    {
      "q": 18,
      "r": 7,
      "iso3c": "BIH"
    },
    {
      "q": 18,
      "r": 8,
      "iso3c": "MNE"
    },
    {
      "q": 18,
      "r": 10,
      "iso3c": "TUN"
    },
    {
      "q": 18,
      "r": 11,
      "iso3c": "TCD"
    },
    {
      "q": 18,
      "r": 12,
      "iso3c": "CAF"
    },
    {
      "q": 18,
      "r": 13,
      "iso3c": "CMR"
    },
    {
      "q": 18,
      "r": 14,
      "iso3c": "COG"
    },
    {
      "q": 18,
      "r": 15,
      "iso3c": "AGO"
    },
    {
      "q": 18,
      "r": 16,
      "iso3c": "BWA"
    },
    {
      "q": 18,
      "r": 17,
      "iso3c": "NAM"
    },
    {
      "q": 18,
      "r": 19,
      "iso3c": "ATA"
    },
    {
      "q": 19,
      "r": 1,
      "iso3c": "SWE"
    },
    {
      "q": 19,
      "r": 2,
      "iso3c": "FIN"
    },
    {
      "q": 19,
      "r": 3,
      "iso3c": "EST"
    },
    {
      "q": 19,
      "r": 4,
      "iso3c": "MDA"
    },
    {
      "q": 19,
      "r": 5,
      "iso3c": "ROU"
    },
    {
      "q": 19,
      "r": 6,
      "iso3c": "HUN"
    },
    {
      "q": 19,
      "r": 7,
      "iso3c": "SRB"
    },
    {
      "q": 19,
      "r": 8,
      "iso3c": "XKX"
    },
    {
      "q": 19,
      "r": 9,
      "iso3c": "ALB"
    },
    {
      "q": 19,
      "r": 11,
      "iso3c": "LBY"
    },
    {
      "q": 19,
      "r": 12,
      "iso3c": "SDN"
    },
    {
      "q": 19,
      "r": 13,
      "iso3c": "SSD"
    },
    {
      "q": 19,
      "r": 14,
      "iso3c": "COD"
    },
    {
      "q": 19,
      "r": 15,
      "iso3c": "BDI"
    },
    {
      "q": 19,
      "r": 16,
      "iso3c": "ZMB"
    },
    {
      "q": 19,
      "r": 17,
      "iso3c": "LSO"
    },
    {
      "q": 19,
      "r": 18,
      "iso3c": "ZAF"
    },
    {
      "q": 20,
      "r": 5,
      "iso3c": "BGR"
    },
    {
      "q": 20,
      "r": 6,
      "iso3c": "MKD"
    },
    {
      "q": 20,
      "r": 7,
      "iso3c": "GRC"
    },
    {
      "q": 20,
      "r": 8,
      "iso3c": "CYP"
    },
    {
      "q": 20,
      "r": 10,
      "iso3c": "EGY"
    },
    {
      "q": 20,
      "r": 11,
      "iso3c": "ERI"
    },
    {
      "q": 20,
      "r": 12,
      "iso3c": "ETH"
    },
    {
      "q": 20,
      "r": 13,
      "iso3c": "UGA"
    },
    {
      "q": 20,
      "r": 14,
      "iso3c": "RWA"
    },
    {
      "q": 20,
      "r": 15,
      "iso3c": "MWI"
    },
    {
      "q": 20,
      "r": 16,
      "iso3c": "ZWE"
    },
    {
      "q": 20,
      "r": 17,
      "iso3c": "SWZ"
    },
    {
      "q": 21,
      "r": 5,
      "iso3c": "AZE"
    },
    {
      "q": 21,
      "r": 7,
      "iso3c": "TUR"
    },
    {
      "q": 21,
      "r": 8,
      "iso3c": "LBN"
    },
    {
      "q": 21,
      "r": 9,
      "iso3c": "ISR"
    },
    {
      "q": 21,
      "r": 10,
      "iso3c": "PSE"
    },
    {
      "q": 21,
      "r": 12,
      "iso3c": "DJI"
    },
    {
      "q": 21,
      "r": 13,
      "iso3c": "SOM"
    },
    {
      "q": 21,
      "r": 14,
      "iso3c": "KEN"
    },
    {
      "q": 21,
      "r": 15,
      "iso3c": "TZA"
    },
    {
      "q": 21,
      "r": 16,
      "iso3c": "MOZ"
    },
    {
      "q": 22,
      "r": 5,
      "iso3c": "ARM"
    },
    {
      "q": 22,
      "r": 6,
      "iso3c": "GEO"
    },
    {
      "q": 22,
      "r": 7,
      "iso3c": "IRQ"
    },
    {
      "q": 22,
      "r": 8,
      "iso3c": "SYR"
    },
    {
      "q": 22,
      "r": 9,
      "iso3c": "JOR"
    },
    {
      "q": 22,
      "r": 10,
      "iso3c": "SAU"
    },
    {
      "q": 22,
      "r": 11,
      "iso3c": "YEM"
    },
    {
      "q": 23,
      "r": 4,
      "iso3c": "KAZ"
    },
    {
      "q": 23,
      "r": 5,
      "iso3c": "UZB"
    },
    {
      "q": 23,
      "r": 6,
      "iso3c": "TKM"
    },
    {
      "q": 23,
      "r": 7,
      "iso3c": "IRN"
    },
    {
      "q": 23,
      "r": 8,
      "iso3c": "KWT"
    },
    {
      "q": 23,
      "r": 9,
      "iso3c": "QAT"
    },
    {
      "q": 23,
      "r": 10,
      "iso3c": "BHR"
    },
    {
      "q": 23,
      "r": 11,
      "iso3c": "OMN"
    },
    {
      "q": 23,
      "r": 15,
      "iso3c": "COM"
    },
    {
      "q": 24,
      "r": 4,
      "iso3c": "KGZ"
    },
    {
      "q": 24,
      "r": 5,
      "iso3c": "TJK"
    },
    {
      "q": 24,
      "r": 6,
      "iso3c": "AFG"
    },
    {
      "q": 24,
      "r": 7,
      "iso3c": "PAK"
    },
    {
      "q": 24,
      "r": 10,
      "iso3c": "ARE"
    },
    {
      "q": 24,
      "r": 14,
      "iso3c": "SYC"
    },
    {
      "q": 24,
      "r": 15,
      "iso3c": "MDG"
    },
    {
      "q": 25,
      "r": 4,
      "iso3c": "RUS"
    },
    {
      "q": 25,
      "r": 5,
      "iso3c": "MNG"
    },
    {
      "q": 25,
      "r": 6,
      "iso3c": "NPL"
    },
    {
      "q": 25,
      "r": 7,
      "iso3c": "IND"
    },
    {
      "q": 25,
      "r": 8,
      "iso3c": "LKA"
    },
    {
      "q": 25,
      "r": 12,
      "iso3c": "MDV"
    },
    {
      "q": 25,
      "r": 15,
      "iso3c": "MUS"
    },
    {
      "q": 26,
      "r": 4,
      "iso3c": "PRK"
    },
    {
      "q": 26,
      "r": 5,
      "iso3c": "CHN"
    },
    {
      "q": 26,
      "r": 6,
      "iso3c": "BTN"
    },
    {
      "q": 26,
      "r": 7,
      "iso3c": "BGD"
    },
    {
      "q": 26,
      "r": 9,
      "iso3c": "SGP"
    },
    {
      "q": 27,
      "r": 4,
      "iso3c": "KOR"
    },
    {
      "q": 27,
      "r": 6,
      "iso3c": "LAO"
    },
    {
      "q": 27,
      "r": 7,
      "iso3c": "MMR"
    },
    {
      "q": 27,
      "r": 8,
      "iso3c": "THA"
    },
    {
      "q": 27,
      "r": 9,
      "iso3c": "MYS"
    },
    {
      "q": 27,
      "r": 10,
      "iso3c": "IDN"
    },
    {
      "q": 27,
      "r": 11,
      "iso3c": "TLS"
    },
    {
      "q": 28,
      "r": 4,
      "iso3c": "TWN"
    },
    {
      "q": 28,
      "r": 5,
      "iso3c": "HKG"
    },
    {
      "q": 28,
      "r": 6,
      "iso3c": "VNM"
    },
    {
      "q": 28,
      "r": 7,
      "iso3c": "KHM"
    },
    {
      "q": 28,
      "r": 9,
      "iso3c": "BRN"
    },
    {
      "q": 28,
      "r": 10,
      "iso3c": "PNG"
    },
    {
      "q": 28,
      "r": 14,
      "iso3c": "AUS"
    },
    {
      "q": 29,
      "r": 6,
      "iso3c": "MAC"
    },
    {
      "q": 29,
      "r": 16,
      "iso3c": "NZL"
    },
    {
      "q": 30,
      "r": 7,
      "iso3c": "PHL"
    },
    {
      "q": 30,
      "r": 9,
      "iso3c": "FSM"
    },
    {
      "q": 30,
      "r": 10,
      "iso3c": "PLW"
    },
    {
      "q": 30,
      "r": 11,
      "iso3c": "NRU"
    },
    {
      "q": 30,
      "r": 12,
      "iso3c": "SLB"
    },
    {
      "q": 30,
      "r": 13,
      "iso3c": "VUT"
    },
    {
      "q": 30,
      "r": 14,
      "iso3c": "NCL"
    },
    {
      "q": 31,
      "r": 5,
      "iso3c": "JPN"
    },
    {
      "q": 31,
      "r": 9,
      "iso3c": "MNP"
    },
    {
      "q": 31,
      "r": 10,
      "iso3c": "GUM"
    },
    {
      "q": 31,
      "r": 11,
      "iso3c": "MHL"
    },
    {
      "q": 31,
      "r": 12,
      "iso3c": "KIR"
    },
    {
      "q": 31,
      "r": 13,
      "iso3c": "TUV"
    },
    {
      "q": 31,
      "r": 14,
      "iso3c": "FJI"
    }
  ];
  function ascending(a, b) {
    return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }
  function descending(a, b) {
    return a == null || b == null ? NaN : b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
  }
  function bisector(f) {
    let compare1, compare2, delta;
    if (f.length !== 2) {
      compare1 = ascending;
      compare2 = (d, x) => ascending(f(d), x);
      delta = (d, x) => f(d) - x;
    } else {
      compare1 = f === ascending || f === descending ? f : zero$1;
      compare2 = f;
      delta = f;
    }
    function left(a, x, lo = 0, hi = a.length) {
      if (lo < hi) {
        if (compare1(x, x) !== 0) return hi;
        do {
          const mid = lo + hi >>> 1;
          if (compare2(a[mid], x) < 0) lo = mid + 1;
          else hi = mid;
        } while (lo < hi);
      }
      return lo;
    }
    function right(a, x, lo = 0, hi = a.length) {
      if (lo < hi) {
        if (compare1(x, x) !== 0) return hi;
        do {
          const mid = lo + hi >>> 1;
          if (compare2(a[mid], x) <= 0) lo = mid + 1;
          else hi = mid;
        } while (lo < hi);
      }
      return lo;
    }
    function center(a, x, lo = 0, hi = a.length) {
      const i = left(a, x, lo, hi - 1);
      return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
    }
    return { left, center, right };
  }
  function zero$1() {
    return 0;
  }
  function number(x) {
    return x === null ? NaN : +x;
  }
  const ascendingBisect = bisector(ascending);
  const bisectRight = ascendingBisect.right;
  bisector(number).center;
  function extent(values, valueof) {
    let min2;
    let max2;
    if (valueof === void 0) {
      for (const value of values) {
        if (value != null) {
          if (min2 === void 0) {
            if (value >= value) min2 = max2 = value;
          } else {
            if (min2 > value) min2 = value;
            if (max2 < value) max2 = value;
          }
        }
      }
    } else {
      let index2 = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index2, values)) != null) {
          if (min2 === void 0) {
            if (value >= value) min2 = max2 = value;
          } else {
            if (min2 > value) min2 = value;
            if (max2 < value) max2 = value;
          }
        }
      }
    }
    return [min2, max2];
  }
  class InternMap extends Map {
    constructor(entries, key = keyof) {
      super();
      Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key } });
      if (entries != null) for (const [key2, value] of entries) this.set(key2, value);
    }
    get(key) {
      return super.get(intern_get(this, key));
    }
    has(key) {
      return super.has(intern_get(this, key));
    }
    set(key, value) {
      return super.set(intern_set(this, key), value);
    }
    delete(key) {
      return super.delete(intern_delete(this, key));
    }
  }
  function intern_get({ _intern, _key }, value) {
    const key = _key(value);
    return _intern.has(key) ? _intern.get(key) : value;
  }
  function intern_set({ _intern, _key }, value) {
    const key = _key(value);
    if (_intern.has(key)) return _intern.get(key);
    _intern.set(key, value);
    return value;
  }
  function intern_delete({ _intern, _key }, value) {
    const key = _key(value);
    if (_intern.has(key)) {
      value = _intern.get(key);
      _intern.delete(key);
    }
    return value;
  }
  function keyof(value) {
    return value !== null && typeof value === "object" ? value.valueOf() : value;
  }
  const e10 = Math.sqrt(50), e5 = Math.sqrt(10), e2 = Math.sqrt(2);
  function tickSpec(start, stop, count) {
    const step = (stop - start) / Math.max(0, count), power = Math.floor(Math.log10(step)), error = step / Math.pow(10, power), factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
    let i1, i2, inc;
    if (power < 0) {
      inc = Math.pow(10, -power) / factor;
      i1 = Math.round(start * inc);
      i2 = Math.round(stop * inc);
      if (i1 / inc < start) ++i1;
      if (i2 / inc > stop) --i2;
      inc = -inc;
    } else {
      inc = Math.pow(10, power) * factor;
      i1 = Math.round(start / inc);
      i2 = Math.round(stop / inc);
      if (i1 * inc < start) ++i1;
      if (i2 * inc > stop) --i2;
    }
    if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
    return [i1, i2, inc];
  }
  function ticks(start, stop, count) {
    stop = +stop, start = +start, count = +count;
    if (!(count > 0)) return [];
    if (start === stop) return [start];
    const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
    if (!(i2 >= i1)) return [];
    const n = i2 - i1 + 1, ticks2 = new Array(n);
    if (reverse) {
      if (inc < 0) for (let i = 0; i < n; ++i) ticks2[i] = (i2 - i) / -inc;
      else for (let i = 0; i < n; ++i) ticks2[i] = (i2 - i) * inc;
    } else {
      if (inc < 0) for (let i = 0; i < n; ++i) ticks2[i] = (i1 + i) / -inc;
      else for (let i = 0; i < n; ++i) ticks2[i] = (i1 + i) * inc;
    }
    return ticks2;
  }
  function tickIncrement(start, stop, count) {
    stop = +stop, start = +start, count = +count;
    return tickSpec(start, stop, count)[2];
  }
  function tickStep(start, stop, count) {
    stop = +stop, start = +start, count = +count;
    const reverse = stop < start, inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
    return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
  }
  function max$1(values, valueof) {
    let max2;
    {
      for (const value of values) {
        if (value != null && (max2 < value || max2 === void 0 && value >= value)) {
          max2 = value;
        }
      }
    }
    return max2;
  }
  function min$1(values, valueof) {
    let min2;
    {
      for (const value of values) {
        if (value != null && (min2 > value || min2 === void 0 && value >= value)) {
          min2 = value;
        }
      }
    }
    return min2;
  }
  function quantileSorted(values, p, valueof = number) {
    if (!(n = values.length) || isNaN(p = +p)) return;
    if (p <= 0 || n < 2) return +valueof(values[0], 0, values);
    if (p >= 1) return +valueof(values[n - 1], n - 1, values);
    var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = +valueof(values[i0], i0, values), value1 = +valueof(values[i0 + 1], i0 + 1, values);
    return value0 + (value1 - value0) * (i - i0);
  }
  function initRange(domain, range) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        this.range(domain);
        break;
      default:
        this.range(range).domain(domain);
        break;
    }
    return this;
  }
  function initInterpolator(domain, interpolator) {
    switch (arguments.length) {
      case 0:
        break;
      case 1: {
        if (typeof domain === "function") this.interpolator(domain);
        else this.range(domain);
        break;
      }
      default: {
        this.domain(domain);
        if (typeof interpolator === "function") this.interpolator(interpolator);
        else this.range(interpolator);
        break;
      }
    }
    return this;
  }
  const implicit = Symbol("implicit");
  function ordinal() {
    var index2 = new InternMap(), domain = [], range = [], unknown = implicit;
    function scale(d) {
      let i = index2.get(d);
      if (i === void 0) {
        if (unknown !== implicit) return unknown;
        index2.set(d, i = domain.push(d) - 1);
      }
      return range[i % range.length];
    }
    scale.domain = function(_) {
      if (!arguments.length) return domain.slice();
      domain = [], index2 = new InternMap();
      for (const value of _) {
        if (index2.has(value)) continue;
        index2.set(value, domain.push(value) - 1);
      }
      return scale;
    };
    scale.range = function(_) {
      return arguments.length ? (range = Array.from(_), scale) : range.slice();
    };
    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };
    scale.copy = function() {
      return ordinal(domain, range).unknown(unknown);
    };
    initRange.apply(scale, arguments);
    return scale;
  }
  function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }
  function Color() {
  }
  var darker = 0.7;
  var brighter = 1 / darker;
  var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`), reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`), reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`), reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`), reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`), reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
  var named = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
  define(Color, color, {
    copy(channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });
  function color_formatHex() {
    return this.rgb().formatHex();
  }
  function color_formatHex8() {
    return this.rgb().formatHex8();
  }
  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }
  function color_formatRgb() {
    return this.rgb().formatRgb();
  }
  function color(format2) {
    var m, l;
    format2 = (format2 + "").trim().toLowerCase();
    return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  }
  function rgbn(n) {
    return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
  }
  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }
  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }
  function rgb$1(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  define(Rgb, rgb$1, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));
  function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }
  function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }
  function rgb_formatRgb() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
  }
  function clampa(opacity) {
    return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
  }
  function clampi(value) {
    return Math.max(0, Math.min(255, Math.round(value) || 0));
  }
  function hex(value) {
    value = clampi(value);
    return (value < 16 ? "0" : "") + value.toString(16);
  }
  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }
  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl();
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min2, l = (max2 + min2) / 2;
    if (s) {
      if (r === max2) h = (g - b) / s + (g < b) * 6;
      else if (g === max2) h = (b - r) / s + 2;
      else h = (r - g) / s + 4;
      s /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }
  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }
  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }
  define(Hsl, hsl, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb() {
      var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
      return new Rgb(
        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
        hsl2rgb(h, m1, m2),
        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
        this.opacity
      );
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl() {
      const a = clampa(this.opacity);
      return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
    }
  }));
  function clamph(value) {
    value = (value || 0) % 360;
    return value < 0 ? value + 360 : value;
  }
  function clampt(value) {
    return Math.max(0, Math.min(1, value || 0));
  }
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }
  const radians = Math.PI / 180;
  const degrees = 180 / Math.PI;
  const K = 18, Xn = 0.96422, Yn = 1, Zn = 0.82521, t0 = 4 / 29, t1 = 6 / 29, t2 = 3 * t1 * t1, t3 = t1 * t1 * t1;
  function labConvert(o) {
    if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
    if (o instanceof Hcl) return hcl2lab(o);
    if (!(o instanceof Rgb)) o = rgbConvert(o);
    var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
    if (r === g && g === b) x = z = y;
    else {
      x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
      z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
    }
    return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
  }
  function lab$1(l, a, b, opacity) {
    return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
  }
  function Lab(l, a, b, opacity) {
    this.l = +l;
    this.a = +a;
    this.b = +b;
    this.opacity = +opacity;
  }
  define(Lab, lab$1, extend(Color, {
    brighter(k) {
      return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    darker(k) {
      return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    rgb() {
      var y = (this.l + 16) / 116, x = isNaN(this.a) ? y : y + this.a / 500, z = isNaN(this.b) ? y : y - this.b / 200;
      x = Xn * lab2xyz(x);
      y = Yn * lab2xyz(y);
      z = Zn * lab2xyz(z);
      return new Rgb(
        lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
        lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.033454 * z),
        lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
        this.opacity
      );
    }
  }));
  function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
  }
  function lab2xyz(t) {
    return t > t1 ? t * t * t : t2 * (t - t0);
  }
  function lrgb2rgb(x) {
    return 255 * (x <= 31308e-7 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  }
  function rgb2lrgb(x) {
    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }
  function hclConvert(o) {
    if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
    if (!(o instanceof Lab)) o = labConvert(o);
    if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
    var h = Math.atan2(o.b, o.a) * degrees;
    return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
  }
  function hcl(h, c, l, opacity) {
    return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
  }
  function Hcl(h, c, l, opacity) {
    this.h = +h;
    this.c = +c;
    this.l = +l;
    this.opacity = +opacity;
  }
  function hcl2lab(o) {
    if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
    var h = o.h * radians;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }
  define(Hcl, hcl, extend(Color, {
    brighter(k) {
      return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
    },
    darker(k) {
      return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
    },
    rgb() {
      return hcl2lab(this).rgb();
    }
  }));
  const constant = (x) => () => x;
  function linear(a, d) {
    return function(t) {
      return a + t * d;
    };
  }
  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
      return Math.pow(a + t * b, y);
    };
  }
  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
    };
  }
  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant(isNaN(a) ? b : a);
  }
  const rgb = function rgbGamma(y) {
    var color2 = gamma(y);
    function rgb2(start, end) {
      var r = color2((start = rgb$1(start)).r, (end = rgb$1(end)).r), g = color2(start.g, end.g), b = color2(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }
    rgb2.gamma = rgbGamma;
    return rgb2;
  }(1);
  function numberArray(a, b) {
    if (!b) b = [];
    var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
    return function(t) {
      for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
      return c;
    };
  }
  function isNumberArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
  }
  function genericArray(a, b) {
    var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
    for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);
    for (; i < nb; ++i) c[i] = b[i];
    return function(t) {
      for (i = 0; i < na; ++i) c[i] = x[i](t);
      return c;
    };
  }
  function date(a, b) {
    var d = /* @__PURE__ */ new Date();
    return a = +a, b = +b, function(t) {
      return d.setTime(a * (1 - t) + b * t), d;
    };
  }
  function interpolateNumber(a, b) {
    return a = +a, b = +b, function(t) {
      return a * (1 - t) + b * t;
    };
  }
  function object(a, b) {
    var i = {}, c = {}, k;
    if (a === null || typeof a !== "object") a = {};
    if (b === null || typeof b !== "object") b = {};
    for (k in b) {
      if (k in a) {
        i[k] = interpolate(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }
    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }
  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
  function zero(b) {
    return function() {
      return b;
    };
  }
  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }
  function string(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
    a = a + "", b = b + "";
    while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) {
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs;
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) {
        if (s[i]) s[i] += bm;
        else s[++i] = bm;
      } else {
        s[++i] = null;
        q.push({ i, x: interpolateNumber(am, bm) });
      }
      bi = reB.lastIndex;
    }
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
      for (var i2 = 0, o; i2 < b; ++i2) s[(o = q[i2]).i] = o.x(t);
      return s.join("");
    });
  }
  function interpolate(a, b) {
    var t = typeof b, c;
    return b == null || t === "boolean" ? constant(b) : (t === "number" ? interpolateNumber : t === "string" ? (c = color(b)) ? (b = c, rgb) : string : b instanceof color ? rgb : b instanceof Date ? date : isNumberArray(b) ? numberArray : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : interpolateNumber)(a, b);
  }
  function interpolateRound(a, b) {
    return a = +a, b = +b, function(t) {
      return Math.round(a * (1 - t) + b * t);
    };
  }
  function lab(start, end) {
    var l = nogamma((start = lab$1(start)).l, (end = lab$1(end)).l), a = nogamma(start.a, end.a), b = nogamma(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.l = l(t);
      start.a = a(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
  function piecewise(interpolate$1, values) {
    if (values === void 0) values = interpolate$1, interpolate$1 = interpolate;
    var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
    while (i < n) I[i] = interpolate$1(v, v = values[++i]);
    return function(t) {
      var i2 = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
      return I[i2](t - i2);
    };
  }
  function quantize$1(interpolator, n) {
    var samples = new Array(n);
    for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
    return samples;
  }
  function identity$1(x) {
    return x;
  }
  function formatDecimal(x) {
    return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
  }
  function formatDecimalParts(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null;
    var i, coefficient = x.slice(0, i);
    return [
      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
      +x.slice(i + 1)
    ];
  }
  function exponent(x) {
    return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
  }
  function formatGroup(grouping, thousands) {
    return function(value, width) {
      var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }
      return t.reverse().join(thousands);
    };
  }
  function formatNumerals(numerals) {
    return function(value) {
      return value.replace(/[0-9]/g, function(i) {
        return numerals[+i];
      });
    };
  }
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
      fill: match[1],
      align: match[2],
      sign: match[3],
      symbol: match[4],
      zero: match[5],
      width: match[6],
      comma: match[7],
      precision: match[8] && match[8].slice(1),
      trim: match[9],
      type: match[10]
    });
  }
  formatSpecifier.prototype = FormatSpecifier.prototype;
  function FormatSpecifier(specifier) {
    this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
    this.align = specifier.align === void 0 ? ">" : specifier.align + "";
    this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === void 0 ? void 0 : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === void 0 ? "" : specifier.type + "";
  }
  FormatSpecifier.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
  };
  function formatTrim(s) {
    out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".":
          i0 = i1 = i;
          break;
        case "0":
          if (i0 === 0) i0 = i;
          i1 = i;
          break;
        default:
          if (!+s[i]) break out;
          if (i0 > 0) i0 = 0;
          break;
      }
    }
    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }
  var prefixExponent;
  function formatPrefixAuto(x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent2 = d[1], i = exponent2 - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent2 / 3))) * 3) + 1, n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0];
  }
  function formatRounded(x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent2 = d[1];
    return exponent2 < 0 ? "0." + new Array(-exponent2).join("0") + coefficient : coefficient.length > exponent2 + 1 ? coefficient.slice(0, exponent2 + 1) + "." + coefficient.slice(exponent2 + 1) : coefficient + new Array(exponent2 - coefficient.length + 2).join("0");
  }
  const formatTypes = {
    "%": (x, p) => (x * 100).toFixed(p),
    "b": (x) => Math.round(x).toString(2),
    "c": (x) => x + "",
    "d": formatDecimal,
    "e": (x, p) => x.toExponential(p),
    "f": (x, p) => x.toFixed(p),
    "g": (x, p) => x.toPrecision(p),
    "o": (x) => Math.round(x).toString(8),
    "p": (x, p) => formatRounded(x * 100, p),
    "r": formatRounded,
    "s": formatPrefixAuto,
    "X": (x) => Math.round(x).toString(16).toUpperCase(),
    "x": (x) => Math.round(x).toString(16)
  };
  function identity(x) {
    return x;
  }
  var map = Array.prototype.map, prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  function formatLocale(locale2) {
    var group = locale2.grouping === void 0 || locale2.thousands === void 0 ? identity : formatGroup(map.call(locale2.grouping, Number), locale2.thousands + ""), currencyPrefix = locale2.currency === void 0 ? "" : locale2.currency[0] + "", currencySuffix = locale2.currency === void 0 ? "" : locale2.currency[1] + "", decimal = locale2.decimal === void 0 ? "." : locale2.decimal + "", numerals = locale2.numerals === void 0 ? identity : formatNumerals(map.call(locale2.numerals, String)), percent = locale2.percent === void 0 ? "%" : locale2.percent + "", minus = locale2.minus === void 0 ? "−" : locale2.minus + "", nan = locale2.nan === void 0 ? "NaN" : locale2.nan + "";
    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);
      var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero2 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
      if (type === "n") comma = true, type = "g";
      else if (!formatTypes[type]) precision === void 0 && (precision = 12), trim = true, type = "g";
      if (zero2 || fill === "0" && align === "=") zero2 = true, fill = "0", align = "=";
      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
      var formatType = formatTypes[type], maybeSuffix = /[defgprs%]/.test(type);
      precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
      function format2(value) {
        var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;
          var valueNegative = value < 0 || 1 / value < 0;
          value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
          if (trim) value = formatTrim(value);
          if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
          valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
          if (maybeSuffix) {
            i = -1, n = value.length;
            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }
        if (comma && !zero2) value = group(value, Infinity);
        var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
        if (comma && zero2) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
        switch (align) {
          case "<":
            value = valuePrefix + value + valueSuffix + padding;
            break;
          case "=":
            value = valuePrefix + padding + value + valueSuffix;
            break;
          case "^":
            value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
            break;
          default:
            value = padding + valuePrefix + value + valueSuffix;
            break;
        }
        return numerals(value);
      }
      format2.toString = function() {
        return specifier + "";
      };
      return format2;
    }
    function formatPrefix2(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
      return function(value2) {
        return f(k * value2) + prefix;
      };
    }
    return {
      format: newFormat,
      formatPrefix: formatPrefix2
    };
  }
  var locale;
  var format;
  var formatPrefix;
  defaultLocale({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });
  function defaultLocale(definition) {
    locale = formatLocale(definition);
    format = locale.format;
    formatPrefix = locale.formatPrefix;
    return locale;
  }
  function precisionFixed(step) {
    return Math.max(0, -exponent(Math.abs(step)));
  }
  function precisionPrefix(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
  }
  function precisionRound(step, max2) {
    step = Math.abs(step), max2 = Math.abs(max2) - step;
    return Math.max(0, exponent(max2) - exponent(step)) + 1;
  }
  function tickFormat(start, stop, count, specifier) {
    var step = tickStep(start, stop, count), precision;
    specifier = formatSpecifier(specifier == null ? ",f" : specifier);
    switch (specifier.type) {
      case "s": {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
        return formatPrefix(specifier, value);
      }
      case "":
      case "e":
      case "g":
      case "p":
      case "r": {
        if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
        break;
      }
      case "f":
      case "%": {
        if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
    }
    return format(specifier);
  }
  function linearish(scale) {
    var domain = scale.domain;
    scale.ticks = function(count) {
      var d = domain();
      return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };
    scale.tickFormat = function(count, specifier) {
      var d = domain();
      return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };
    scale.nice = function(count) {
      if (count == null) count = 10;
      var d = domain();
      var i0 = 0;
      var i1 = d.length - 1;
      var start = d[i0];
      var stop = d[i1];
      var prestep;
      var step;
      var maxIter = 10;
      if (stop < start) {
        step = start, start = stop, stop = step;
        step = i0, i0 = i1, i1 = step;
      }
      while (maxIter-- > 0) {
        step = tickIncrement(start, stop, count);
        if (step === prestep) {
          d[i0] = start;
          d[i1] = stop;
          return domain(d);
        } else if (step > 0) {
          start = Math.floor(start / step) * step;
          stop = Math.ceil(stop / step) * step;
        } else if (step < 0) {
          start = Math.ceil(start * step) / step;
          stop = Math.floor(stop * step) / step;
        } else {
          break;
        }
        prestep = step;
      }
      return scale;
    };
    return scale;
  }
  function quantile() {
    var domain = [], range = [], thresholds = [], unknown;
    function rescale() {
      var i = 0, n = Math.max(1, range.length);
      thresholds = new Array(n - 1);
      while (++i < n) thresholds[i - 1] = quantileSorted(domain, i / n);
      return scale;
    }
    function scale(x) {
      return x == null || isNaN(x = +x) ? unknown : range[bisectRight(thresholds, x)];
    }
    scale.invertExtent = function(y) {
      var i = range.indexOf(y);
      return i < 0 ? [NaN, NaN] : [
        i > 0 ? thresholds[i - 1] : domain[0],
        i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
      ];
    };
    scale.domain = function(_) {
      if (!arguments.length) return domain.slice();
      domain = [];
      for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
      domain.sort(ascending);
      return rescale();
    };
    scale.range = function(_) {
      return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
    };
    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };
    scale.quantiles = function() {
      return thresholds.slice();
    };
    scale.copy = function() {
      return quantile().domain(domain).range(range).unknown(unknown);
    };
    return initRange.apply(scale, arguments);
  }
  function quantize() {
    var x0 = 0, x1 = 1, n = 1, domain = [0.5], range = [0, 1], unknown;
    function scale(x) {
      return x != null && x <= x ? range[bisectRight(domain, x, 0, n)] : unknown;
    }
    function rescale() {
      var i = -1;
      domain = new Array(n);
      while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
      return scale;
    }
    scale.domain = function(_) {
      return arguments.length ? ([x0, x1] = _, x0 = +x0, x1 = +x1, rescale()) : [x0, x1];
    };
    scale.range = function(_) {
      return arguments.length ? (n = (range = Array.from(_)).length - 1, rescale()) : range.slice();
    };
    scale.invertExtent = function(y) {
      var i = range.indexOf(y);
      return i < 0 ? [NaN, NaN] : i < 1 ? [x0, domain[0]] : i >= n ? [domain[n - 1], x1] : [domain[i - 1], domain[i]];
    };
    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : scale;
    };
    scale.thresholds = function() {
      return domain.slice();
    };
    scale.copy = function() {
      return quantize().domain([x0, x1]).range(range).unknown(unknown);
    };
    return initRange.apply(linearish(scale), arguments);
  }
  function transformer() {
    var x0 = 0, x1 = 1, t02, t12, k10, transform, interpolator = identity$1, clamp2 = false, unknown;
    function scale(x) {
      return x == null || isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t02) * k10, clamp2 ? Math.max(0, Math.min(1, x)) : x));
    }
    scale.domain = function(_) {
      return arguments.length ? ([x0, x1] = _, t02 = transform(x0 = +x0), t12 = transform(x1 = +x1), k10 = t02 === t12 ? 0 : 1 / (t12 - t02), scale) : [x0, x1];
    };
    scale.clamp = function(_) {
      return arguments.length ? (clamp2 = !!_, scale) : clamp2;
    };
    scale.interpolator = function(_) {
      return arguments.length ? (interpolator = _, scale) : interpolator;
    };
    function range(interpolate2) {
      return function(_) {
        var r0, r1;
        return arguments.length ? ([r0, r1] = _, interpolator = interpolate2(r0, r1), scale) : [interpolator(0), interpolator(1)];
      };
    }
    scale.range = range(interpolate);
    scale.rangeRound = range(interpolateRound);
    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };
    return function(t) {
      transform = t, t02 = t(x0), t12 = t(x1), k10 = t02 === t12 ? 0 : 1 / (t12 - t02);
      return scale;
    };
  }
  function copy(source2, target) {
    return target.domain(source2.domain()).interpolator(source2.interpolator()).clamp(source2.clamp()).unknown(source2.unknown());
  }
  function sequential() {
    var scale = linearish(transformer()(identity$1));
    scale.copy = function() {
      return copy(scale, sequential());
    };
    return initInterpolator.apply(scale, arguments);
  }
  let wbColors = {
    "cat1": "#34A7F2",
    "cat2": "#FF9800",
    "cat3": "#664AB6",
    "cat4": "#4EC2C0",
    "cat5": "#F3578E",
    "cat6": "#081079",
    "cat7": "#0C7C68",
    "cat8": "#AA0000",
    "cat9": "#DDDA21",
    "WLD": "#081079",
    "NAC": "#34A7F2",
    "LCN": "#0C7C68",
    "SAS": "#4EC2C0",
    "MEA": "#664AB6",
    "ECS": "#AA0000",
    "EAS": "#F3578E",
    "SSF": "#FF9800",
    "AFE": "#FF9800",
    "AFW": "#DDDA21",
    "HIC": "#016B6C",
    "UMC": "#73AF48",
    "LMC": "#DB95D7",
    "LIC": "#3B4DA6",
    "male": "#664AB6",
    "female": "#FF9800",
    "diverse": "#4EC2C0",
    "rural": "#54AE89",
    "urban": "#6D88D1",
    "youngestAge": "#F8A8DF",
    "youngerAge": "#B38FD8",
    "middleAge": "#462f98",
    "olderAge": "#6D88D1",
    "oldestAge": "#A1C6FF",
    "yes": "#0071BC",
    "no": "#EBEEF4",
    "noData": "#CED4DE",
    "seq1": "#FDF6DB",
    "seq2": "#A1CBCF",
    "seq3": "#5D99C2",
    "seq4": "#2868A0",
    "seq5": "#023B6F",
    "seqRev1": "#E3F6FD",
    "seqRev2": "#91C5F0",
    "seqRev3": "#8B8AC0",
    "seqRev4": "#88506E",
    "seqRev5": "#691B15",
    "seqB1": "#E3F6FD",
    "seqB2": "#75CCEC",
    "seqB3": "#089BD4",
    "seqB4": "#0169A1",
    "seqB5": "#023B6F",
    "seqY1": "#FDF7DB",
    "seqY2": "#ECB63A",
    "seqY3": "#BE792B",
    "seqY4": "#8D4117",
    "seqY5": "#5C0000",
    "seqP1": "#FFE2FF",
    "seqP2": "#D3ACE6",
    "seqP3": "#A37ACD",
    "seqP4": "#6F4CB4",
    "seqP5": "#2F1E9C",
    "divPos3": "#025288",
    "divPos2": "#3587C3",
    "divPos1": "#80BDE7",
    "divMid": "#EFEFEF",
    "divNeg1": "#E3A763",
    "divNeg2": "#BD6126",
    "divNeg3": "#920000",
    "div2L3": "#24768E",
    "div2L2": "#4EA2AC",
    "div2L1": "#98CBCC",
    "div2Mid": "#EFEFEF",
    "div2R1": "#D1AEE3",
    "div2R2": "#A873C4",
    "div2R3": "#754493"
  };
  let allColors = {
    "wld": wbColors.WLD,
    "nac": wbColors.NAC,
    "lcn": wbColors.LCN,
    "sas": wbColors.SAS,
    "mea": wbColors.MEA,
    "ecs": wbColors.ECS,
    "eas": wbColors.EAS,
    "ssf": wbColors.SSF,
    "afe": wbColors.AFE,
    "afw": wbColors.AFW,
    "world": wbColors.WLD,
    "north america": wbColors.NAC,
    "latin america and caribbean": wbColors.LCN,
    "south asia": wbColors.SAS,
    "middle east and north africa": wbColors.MEA,
    "europe and central asia": wbColors.ECS,
    "east asia and pacific": wbColors.EAS,
    "sub-saharan africa": wbColors.SSF,
    "latin america & caribbean": wbColors.LCN,
    "middle east & north africa": wbColors.MEA,
    "europe & central asia": wbColors.ECS,
    "east asia & pacific": wbColors.EAS,
    "hic": wbColors.HIC,
    "umc": wbColors.UMC,
    "lmc": wbColors.LMC,
    "lic": wbColors.LIC,
    "high income": wbColors.HIC,
    "upper middle income": wbColors.UMC,
    "lower middle income": wbColors.LMC,
    "low income": wbColors.LIC,
    "male": wbColors.male,
    "female": wbColors.female,
    "diverse": wbColors.diverse,
    "rural": wbColors.rural,
    "urban": wbColors.urban,
    "youngestage": wbColors.youngestAge,
    "youngerage": wbColors.youngerAge,
    "middleage": wbColors.middleAge,
    "olderage": wbColors.olderAge,
    "oldestage": wbColors.oldestAge,
    "yes": wbColors.yes,
    "no": wbColors.no
  };
  let catColors = {
    default: {
      cat1: wbColors.cat1,
      cat2: wbColors.cat2,
      cat3: wbColors.cat3,
      cat4: wbColors.cat4,
      cat5: wbColors.cat5,
      cat6: wbColors.cat6,
      cat7: wbColors.cat7,
      cat8: wbColors.cat8,
      cat9: wbColors.cat9
    }
  };
  let seqColors = {
    seq: [
      wbColors.seq1,
      wbColors.seq2,
      wbColors.seq3,
      wbColors.seq4,
      wbColors.seq5
    ],
    seqRev: [
      wbColors.seqRev1,
      wbColors.seqRev2,
      wbColors.seqRev3,
      wbColors.seqRev4,
      wbColors.seqRev5
    ],
    seqB: [
      wbColors.seqB1,
      wbColors.seqB2,
      wbColors.seqB3,
      wbColors.seqB4,
      wbColors.seqB5
    ],
    seqY: [
      wbColors.seqY1,
      wbColors.seqY2,
      wbColors.seqY3,
      wbColors.seqY4,
      wbColors.seqY5
    ],
    seqP: [
      wbColors.seqP1,
      wbColors.seqP2,
      wbColors.seqP3,
      wbColors.seqP4,
      wbColors.seqP5
    ],
    div: [
      wbColors.divNeg3,
      wbColors.divNeg2,
      wbColors.divNeg1,
      wbColors.divMid,
      wbColors.divPos1,
      wbColors.divPos2,
      wbColors.divPos3
    ],
    div2: [
      wbColors.div2L3,
      wbColors.div2L2,
      wbColors.div2L1,
      wbColors.div2Mid,
      wbColors.div2R1,
      wbColors.div2R2,
      wbColors.div2R3
    ]
  };
  let colorRamps = {
    seq: piecewise(lab, seqColors.seq),
    seqRev: piecewise(lab, seqColors.seqRev),
    seqB: piecewise(lab, seqColors.seqB),
    seqY: piecewise(lab, seqColors.seqY),
    seqP: piecewise(lab, seqColors.seqP),
    div: piecewise(lab, seqColors.div),
    div2: piecewise(lab, seqColors.div2)
  };
  let getNumericalColorScale = function(data2, domain, linearOrBinned, scaleType, colorScale, colorScaleDiverging, binningMode, numberOfBins) {
    if (linearOrBinned == "linear") {
      return sequential(
        colorRamps[scaleType == "sequential" ? colorScale : colorScaleDiverging]
      ).domain(domain);
    }
    let getDiscreteColors = function(colorRamp, colorNumber) {
      let arr = [...Array(colorNumber).keys()].map((i) => i / (colorNumber - 1));
      let colors = arr.map((d) => colorRamp(d));
      return colors;
    };
    if (linearOrBinned == "binned" && binningMode == "fixedWidth") {
      return quantize(
        getDiscreteColors(
          colorRamps[scaleType == "sequential" ? colorScale : colorScaleDiverging],
          numberOfBins
        )
      ).domain(domain);
    }
    if (linearOrBinned == "binned" && binningMode == "quantile") {
      return quantile(
        getDiscreteColors(
          colorRamps[scaleType == "sequential" ? colorScale : colorScaleDiverging],
          numberOfBins
        )
      ).domain(data2.plotdata.map((d) => d.color));
    }
  };
  let getCategoricalColorScale = function(data2) {
    let colorDomain = [...new Set(data2.plotdata.map((d) => d.color))].filter(
      (d) => d != ""
    );
    let colorRange = colorDomain.map((d) => {
      if (allColors[d.toLowerCase()]) {
        return allColors[d.toLowerCase()];
      } else {
        return wbColors.noData;
      }
    });
    if (colorRange.every((d) => d == wbColors.noData)) {
      colorRange = Object.values(catColors.default);
    }
    return ordinal(colorDomain, colorRange).unknown(wbColors.noData);
  };
  let generateHexLayout = function(grid, size, shift2) {
    let hexGrid2 = grid.map((d) => {
      let hex2 = {};
      let x = size + d.q * 3 / 2 * size;
      let y = d.q % 2 == 0 ? 2 * size + d.r * size * 2 * shift2 : 2 * size + d.r * size * 2 * shift2 - Math.sqrt(3) * size / 2;
      hex2.q = d.q;
      hex2.r = d.r;
      hex2.iso3c = d.iso3c;
      hex2.x = x;
      hex2.y = y;
      hex2.size = size;
      let vertices = [];
      for (let i = 0; i < 6; i++) {
        var angle_deg = 60 * i;
        var angle_rad = Math.PI / 180 * angle_deg;
        vertices.push([
          x + size * Math.cos(angle_rad),
          y + size * Math.sin(angle_rad)
        ]);
      }
      hex2.vertices = vertices;
      return hex2;
    });
    return hexGrid2;
  };
  mark_module_start();
  WorldHexGrid[FILENAME] = "src/WorldHexGrid.svelte";
  var on_mouseover$1 = (_, currentCountry, hex2, searched, tooltipVisible) => {
    currentCountry(get(hex2).iso3c);
    searched(false);
    tooltipVisible(true);
  };
  var on_mouseout$1 = (__1, currentCountry, tooltipVisible) => {
    currentCountry(null);
    tooltipVisible(false);
  };
  var root_2$3 = add_locations(/* @__PURE__ */ ns_template(`<text class="country-label svelte-166i5y3" paint-order="stroke" stroke-linejoin="round"> </text>`), WorldHexGrid[FILENAME], [[80, 6]]);
  var root_1$3 = add_locations(/* @__PURE__ */ ns_template(`<polygon></polygon><!>`, 1), WorldHexGrid[FILENAME], [[48, 4]]);
  var root_3$3 = add_locations(/* @__PURE__ */ ns_template(`<polygon></polygon><polygon></polygon>`, 1), WorldHexGrid[FILENAME], [[95, 4], [102, 4]]);
  var root$8 = add_locations(/* @__PURE__ */ ns_template(`<g><!><!></g>`), WorldHexGrid[FILENAME], [[45, 0]]);
  function WorldHexGrid($$anchor, $$props) {
    check_target(new.target);
    push($$props, true, WorldHexGrid);
    let currentCountry = prop($$props, "currentCountry", 15), currentTilePos = prop($$props, "currentTilePos", 15), searched = prop($$props, "searched", 15), tooltipVisible = prop($$props, "tooltipVisible", 15);
    let valueType = /* @__PURE__ */ derived(() => $$props.data.plotdata.metadata.color.type);
    const shift2 = Math.cos(Math.PI / 180 * 30);
    let size = /* @__PURE__ */ derived(() => Math.min($$props.width / (33 * 3 / 2), $$props.height / (22 * 2 * shift2)));
    let hexLayout = /* @__PURE__ */ derived(() => generateHexLayout(hexGrid, get(size), shift2));
    let currentTile = /* @__PURE__ */ derived(() => get(hexLayout).find((d) => equals(d.iso3c, currentCountry())));
    let gridWidth = /* @__PURE__ */ derived(() => Math.round(max$1(get(hexLayout).map((d) => d.x))));
    let gridShift = /* @__PURE__ */ derived(() => ($$props.width - get(gridWidth)) / 2);
    user_effect(() => {
      if (currentCountry()) {
        currentTilePos({
          x: get(currentTile).x,
          y: get(currentTile).y + 2.5 * get(currentTile).size
        });
      }
    });
    var g = root$8();
    var node = child(g);
    each(node, 17, () => get(hexLayout), index, ($$anchor2, hex2) => {
      var fragment = root_1$3();
      var polygon = first_child(fragment);
      polygon.__mouseover = [
        on_mouseover$1,
        currentCountry,
        hex2,
        searched,
        tooltipVisible
      ];
      polygon.__mouseout = [on_mouseout$1, currentCountry, tooltipVisible];
      var node_1 = sibling(polygon);
      {
        var consequent = ($$anchor3) => {
          var text = root_2$3();
          set_attribute(text, "text-anchor", "middle");
          set_attribute(text, "font-size", "0.6rem");
          set_attribute(text, "stroke", "#ffffff");
          set_attribute(text, "stroke-width", 2);
          var text_1 = child(text);
          template_effect(() => {
            set_attribute(text, "x", get(hex2).x);
            set_attribute(text, "y", get(hex2).y + 4);
            set_text(text_1, get(hex2).iso3c);
          });
          append($$anchor3, text);
        };
        if_block(node_1, ($$render) => {
          if ($$props.countryCodes) $$render(consequent);
        });
      }
      template_effect(
        ($0) => {
          set_class(polygon, 0, `hex q-${get(hex2).q} r-${get(hex2).r}`, "svelte-166i5y3");
          set_attribute(polygon, "points", get(hex2).vertices);
          set_attribute(polygon, "fill", $0);
          set_style(polygon, "stroke-width", $$props.strokeWidth);
          set_style(polygon, "stroke", $$props.stroke);
        },
        [
          () => $$props.data.plotdata.find((d) => equals(d.iso3c, get(hex2).iso3c)) && equals($$props.data.plotdata.find((d) => equals(d.iso3c, get(hex2).iso3c)).color, null, false) ? equals(get(valueType), "string") ? $$props.categoricalColorScale($$props.data.plotdata.find((d) => equals(d.iso3c, get(hex2).iso3c)).color) : $$props.numericalColorScale($$props.data.plotdata.find((d) => equals(d.iso3c, get(hex2).iso3c)).color) : $$props.noDataColor
        ]
      );
      event("focus", polygon, () => {
        currentCountry(get(hex2).iso3c);
        searched(false);
        tooltipVisible(true);
      });
      event("blur", polygon, () => {
        currentCountry(null);
        tooltipVisible(false);
      });
      append($$anchor2, fragment);
    });
    var node_2 = sibling(node);
    {
      var consequent_1 = ($$anchor2) => {
        var fragment_1 = root_3$3();
        var polygon_1 = first_child(fragment_1);
        set_class(polygon_1, 0, "highlight-outline svelte-166i5y3");
        set_attribute(polygon_1, "fill", "none");
        set_attribute(polygon_1, "stroke", "#FFFFFF");
        var polygon_2 = sibling(polygon_1);
        set_class(polygon_2, 0, "highlight-outline svelte-166i5y3");
        set_attribute(polygon_2, "fill", "none");
        set_attribute(polygon_2, "stroke", "#000000");
        template_effect(() => {
          set_attribute(polygon_1, "points", get(currentTile).vertices);
          set_attribute(polygon_1, "stroke-width", $$props.strokeWidth + 2);
          set_attribute(polygon_2, "points", get(currentTile).vertices);
          set_attribute(polygon_2, "stroke-width", $$props.strokeWidth);
        });
        append($$anchor2, fragment_1);
      };
      if_block(node_2, ($$render) => {
        if (currentCountry()) $$render(consequent_1);
      });
    }
    template_effect(() => set_attribute(g, "transform", `translate(${get(gridShift)},0)`));
    append($$anchor, g);
    return pop({ ...legacy_api() });
  }
  mark_module_end(WorldHexGrid);
  delegate(["mouseover", "mouseout"]);
  const squareGrid = [{ "iso3c": "FIN", "x": 16, "y": 1, "country": "Finland", "region_iso3c": "ECS" }, { "iso3c": "GRL", "x": 8, "y": 1, "country": "Greenland", "region_iso3c": "ECS" }, { "iso3c": "ISL", "x": 10, "y": 1, "country": "Iceland", "region_iso3c": "ECS" }, { "iso3c": "NOR", "x": 14, "y": 1, "country": "Norway", "region_iso3c": "ECS" }, { "iso3c": "SWE", "x": 15, "y": 1, "country": "Sweden", "region_iso3c": "ECS" }, { "iso3c": "EST", "x": 16, "y": 2, "country": "Estonia", "region_iso3c": "ECS" }, { "iso3c": "LVA", "x": 16, "y": 3, "country": "Latvia", "region_iso3c": "ECS" }, { "iso3c": "FRO", "x": 11, "y": 3, "country": "Faroe Islands", "region_iso3c": "ECS" }, { "iso3c": "LTU", "x": 15, "y": 3, "country": "Lithuania", "region_iso3c": "ECS" }, { "iso3c": "IMN", "x": 10, "y": 4, "country": "Isle of Man", "region_iso3c": "ECS" }, { "iso3c": "MAF", "x": 8, "y": 4, "country": "Saint Martin", "region_iso3c": "LCN" }, { "iso3c": "BLR", "x": 16, "y": 4, "country": "Belarus", "region_iso3c": "ECS" }, { "iso3c": "POL", "x": 15, "y": 4, "country": "Poland", "region_iso3c": "ECS" }, { "iso3c": "GBR", "x": 11, "y": 4, "country": "Great Britain and Northern Ireland", "region_iso3c": "ECS" }, { "iso3c": "CAN", "x": 1, "y": 4, "country": "Canada", "region_iso3c": "NAC" }, { "iso3c": "DNK", "x": 13, "y": 4, "country": "Denmark", "region_iso3c": "ECS" }, { "iso3c": "BMU", "x": 4, "y": 5, "country": "Bermuda", "region_iso3c": "NAC" }, { "iso3c": "NLD", "x": 12, "y": 5, "country": "Netherlands", "region_iso3c": "ECS" }, { "iso3c": "IRL", "x": 10, "y": 5, "country": "Ireland", "region_iso3c": "ECS" }, { "iso3c": "VGB", "x": 7, "y": 5, "country": "Virgin Islands British", "region_iso3c": "LCN" }, { "iso3c": "SXM", "x": 8, "y": 5, "country": "St Maarten", "region_iso3c": "LCN" }, { "iso3c": "CZE", "x": 14, "y": 5, "country": "Czech Republic", "region_iso3c": "ECS" }, { "iso3c": "SVK", "x": 15, "y": 5, "country": "Slovakia", "region_iso3c": "ECS" }, { "iso3c": "UKR", "x": 16, "y": 5, "country": "Ukraine", "region_iso3c": "ECS" }, { "iso3c": "USA", "x": 1, "y": 5, "country": "United States of America", "region_iso3c": "NAC" }, { "iso3c": "DEU", "x": 13, "y": 5, "country": "Germany", "region_iso3c": "ECS" }, { "iso3c": "MDA", "x": 17, "y": 5, "country": "Moldova (Republic of)", "region_iso3c": "ECS" }, { "iso3c": "KAZ", "x": 21, "y": 5, "country": "Kazakhstan", "region_iso3c": "ECS" }, { "iso3c": "RUS", "x": 22, "y": 5, "country": "Russian Federation", "region_iso3c": "ECS" }, { "iso3c": "BHS", "x": 4, "y": 6, "country": "Bahamas", "region_iso3c": "LCN" }, { "iso3c": "LIE", "x": 14, "y": 6, "country": "Liechtenstein", "region_iso3c": "ECS" }, { "iso3c": "BEL", "x": 12, "y": 6, "country": "Belgium", "region_iso3c": "ECS" }, { "iso3c": "VIR", "x": 7, "y": 6, "country": "Virgin Islands US", "region_iso3c": "LCN" }, { "iso3c": "TCA", "x": 5, "y": 6, "country": "Turks and Caicos Islands", "region_iso3c": "LCN" }, { "iso3c": "ATG", "x": 8, "y": 6, "country": "Antigua & Barbuda", "region_iso3c": "LCN" }, { "iso3c": "AUT", "x": 15, "y": 6, "country": "Austria", "region_iso3c": "ECS" }, { "iso3c": "HUN", "x": 16, "y": 6, "country": "Hungary", "region_iso3c": "ECS" }, { "iso3c": "KGZ", "x": 21, "y": 6, "country": "Kyrgyzstan", "region_iso3c": "ECS" }, { "iso3c": "ROU", "x": 17, "y": 6, "country": "Romania", "region_iso3c": "ECS" }, { "iso3c": "UZB", "x": 20, "y": 6, "country": "Uzbekistan", "region_iso3c": "ECS" }, { "iso3c": "MEX", "x": 1, "y": 6, "country": "Mexico", "region_iso3c": "LCN" }, { "iso3c": "LUX", "x": 13, "y": 6, "country": "Luxembourg", "region_iso3c": "ECS" }, { "iso3c": "ARM", "x": 19, "y": 6, "country": "Armenia", "region_iso3c": "ECS" }, { "iso3c": "MNG", "x": 22, "y": 6, "country": "Mongolia", "region_iso3c": "EAS" }, { "iso3c": "PRK", "x": 23, "y": 6, "country": "North Korea", "region_iso3c": "EAS" }, { "iso3c": "KOR", "x": 24, "y": 6, "country": "South Korea", "region_iso3c": "EAS" }, { "iso3c": "JPN", "x": 27, "y": 6, "country": "Japan", "region_iso3c": "EAS" }, { "iso3c": "TWN", "x": 25, "y": 7, "country": "Taiwan", "region_iso3c": "EAS" }, { "iso3c": "HKG", "x": 24, "y": 7, "country": "Hong Kong", "region_iso3c": "EAS" }, { "iso3c": "CUB", "x": 4, "y": 7, "country": "Cuba", "region_iso3c": "LCN" }, { "iso3c": "FRA", "x": 12, "y": 7, "country": "France", "region_iso3c": "ECS" }, { "iso3c": "CHE", "x": 13, "y": 7, "country": "Switzerland", "region_iso3c": "ECS" }, { "iso3c": "AND", "x": 11, "y": 7, "country": "Andorra", "region_iso3c": "ECS" }, { "iso3c": "AZE", "x": 19, "y": 7, "country": "Azerbaijan", "region_iso3c": "ECS" }, { "iso3c": "GEO", "x": 18, "y": 7, "country": "Georgia", "region_iso3c": "ECS" }, { "iso3c": "PRI", "x": 7, "y": 7, "country": "Puerto Rico", "region_iso3c": "LCN" }, { "iso3c": "DOM", "x": 6, "y": 7, "country": "Dominican Republic", "region_iso3c": "LCN" }, { "iso3c": "BLZ", "x": 2, "y": 7, "country": "Belize", "region_iso3c": "LCN" }, { "iso3c": "CYM", "x": 3, "y": 7, "country": "Cayman Islands", "region_iso3c": "LCN" }, { "iso3c": "HTI", "x": 5, "y": 7, "country": "Haiti", "region_iso3c": "LCN" }, { "iso3c": "DMA", "x": 8, "y": 7, "country": "Dominica", "region_iso3c": "LCN" }, { "iso3c": "SVN", "x": 14, "y": 7, "country": "Slovenia", "region_iso3c": "ECS" }, { "iso3c": "BIH", "x": 15, "y": 7, "country": "Bosnia & Herzegovina", "region_iso3c": "ECS" }, { "iso3c": "BGR", "x": 17, "y": 7, "country": "Bulgaria", "region_iso3c": "ECS" }, { "iso3c": "SRB", "x": 16, "y": 7, "country": "Serbia", "region_iso3c": "ECS" }, { "iso3c": "TJK", "x": 21, "y": 7, "country": "Tajikistan", "region_iso3c": "ECS" }, { "iso3c": "TKM", "x": 20, "y": 7, "country": "Turkmenistan", "region_iso3c": "ECS" }, { "iso3c": "GTM", "x": 1, "y": 7, "country": "Guatemala", "region_iso3c": "LCN" }, { "iso3c": "NPL", "x": 22, "y": 7, "country": "Nepal", "region_iso3c": "SAS" }, { "iso3c": "CHN", "x": 23, "y": 7, "country": "China", "region_iso3c": "EAS" }, { "iso3c": "MAC", "x": 25, "y": 8, "country": "Macao SAR", "region_iso3c": "EAS" }, { "iso3c": "JAM", "x": 4, "y": 8, "country": "Jamaica", "region_iso3c": "LCN" }, { "iso3c": "PRT", "x": 10, "y": 8, "country": "Portugal", "region_iso3c": "ECS" }, { "iso3c": "ESP", "x": 11, "y": 8, "country": "Spain", "region_iso3c": "ECS" }, { "iso3c": "MCO", "x": 12, "y": 8, "country": "Monaco", "region_iso3c": "ECS" }, { "iso3c": "ITA", "x": 13, "y": 8, "country": "Italy", "region_iso3c": "ECS" }, { "iso3c": "TUR", "x": 18, "y": 8, "country": "Turkey", "region_iso3c": "ECS" }, { "iso3c": "KNA", "x": 7, "y": 8, "country": "St. Kitts & Nevis", "region_iso3c": "LCN" }, { "iso3c": "HND", "x": 2, "y": 8, "country": "Honduras", "region_iso3c": "LCN" }, { "iso3c": "LCA", "x": 8, "y": 8, "country": "St. Lucia", "region_iso3c": "LCN" }, { "iso3c": "HRV", "x": 14, "y": 8, "country": "Croatia", "region_iso3c": "ECS" }, { "iso3c": "AFG", "x": 20, "y": 8, "country": "Afghanistan", "region_iso3c": "SAS" }, { "iso3c": "IRN", "x": 19, "y": 8, "country": "Iran (Islamic Republic of)", "region_iso3c": "MEA" }, { "iso3c": "XKX", "x": 16, "y": 8, "country": "Kosovo", "region_iso3c": "ECS" }, { "iso3c": "MKD", "x": 17, "y": 8, "country": "Macedonia", "region_iso3c": "ECS" }, { "iso3c": "MNE", "x": 15, "y": 8, "country": "Montenegro", "region_iso3c": "ECS" }, { "iso3c": "PAK", "x": 21, "y": 8, "country": "Pakistan", "region_iso3c": "SAS" }, { "iso3c": "IND", "x": 22, "y": 8, "country": "India", "region_iso3c": "SAS" }, { "iso3c": "SLV", "x": 1, "y": 8, "country": "El Salvador", "region_iso3c": "LCN" }, { "iso3c": "BTN", "x": 23, "y": 8, "country": "Bhutan", "region_iso3c": "SAS" }, { "iso3c": "LAO", "x": 24, "y": 8, "country": "Lao People's Democratic Republic", "region_iso3c": "EAS" }, { "iso3c": "VNM", "x": 25, "y": 9, "country": "Viet Nam", "region_iso3c": "EAS" }, { "iso3c": "MMR", "x": 24, "y": 9, "country": "Myanmar", "region_iso3c": "EAS" }, { "iso3c": "SMR", "x": 13, "y": 9, "country": "San Marino", "region_iso3c": "ECS" }, { "iso3c": "IRQ", "x": 19, "y": 9, "country": "Iraq", "region_iso3c": "MEA" }, { "iso3c": "SYR", "x": 18, "y": 9, "country": "Syria", "region_iso3c": "MEA" }, { "iso3c": "NIC", "x": 2, "y": 9, "country": "Nicaragua", "region_iso3c": "LCN" }, { "iso3c": "VCT", "x": 7, "y": 9, "country": "St. Vincent & the Grenadines", "region_iso3c": "LCN" }, { "iso3c": "BRB", "x": 8, "y": 9, "country": "Barbados", "region_iso3c": "LCN" }, { "iso3c": "ALB", "x": 15, "y": 9, "country": "Albania", "region_iso3c": "ECS" }, { "iso3c": "GRC", "x": 16, "y": 9, "country": "Greece", "region_iso3c": "ECS" }, { "iso3c": "LKA", "x": 22, "y": 9, "country": "Sri Lanka", "region_iso3c": "SAS" }, { "iso3c": "GIB", "x": 11, "y": 9, "country": "Gibraltar", "region_iso3c": "ECS" }, { "iso3c": "MDV", "x": 21, "y": 9, "country": "Maldives", "region_iso3c": "SAS" }, { "iso3c": "BGD", "x": 23, "y": 9, "country": "Bangladesh", "region_iso3c": "SAS" }, { "iso3c": "MNP", "x": 29, "y": 10, "country": "Northern Mariana Islands", "region_iso3c": "EAS" }, { "iso3c": "KHM", "x": 25, "y": 10, "country": "Cambodia", "region_iso3c": "EAS" }, { "iso3c": "THA", "x": 24, "y": 10, "country": "Thailand", "region_iso3c": "EAS" }, { "iso3c": "PHL", "x": 27, "y": 10, "country": "Philippines", "region_iso3c": "EAS" }, { "iso3c": "MLT", "x": 14, "y": 10, "country": "Malta", "region_iso3c": "MEA" }, { "iso3c": "KWT", "x": 20, "y": 10, "country": "Kuwait", "region_iso3c": "MEA" }, { "iso3c": "LBN", "x": 18, "y": 10, "country": "Lebanon", "region_iso3c": "MEA" }, { "iso3c": "CUW", "x": 6, "y": 10, "country": "Curacao", "region_iso3c": "LCN" }, { "iso3c": "GRD", "x": 8, "y": 10, "country": "Grenada", "region_iso3c": "LCN" }, { "iso3c": "ABW", "x": 5, "y": 10, "country": "Aruba", "region_iso3c": "LCN" }, { "iso3c": "CRI", "x": 2, "y": 10, "country": "Costa Rica", "region_iso3c": "LCN" }, { "iso3c": "CYP", "x": 16, "y": 10, "country": "Cyprus", "region_iso3c": "ECS" }, { "iso3c": "JOR", "x": 19, "y": 10, "country": "Jordan", "region_iso3c": "MEA" }, { "iso3c": "GUM", "x": 29, "y": 11, "country": "Guam", "region_iso3c": "EAS" }, { "iso3c": "MYS", "x": 24, "y": 11, "country": "Malaysia", "region_iso3c": "EAS" }, { "iso3c": "BHR", "x": 20, "y": 11, "country": "Bahrain", "region_iso3c": "MEA" }, { "iso3c": "SAU", "x": 19, "y": 11, "country": "Saudi Arabia", "region_iso3c": "MEA" }, { "iso3c": "PSE", "x": 17, "y": 11, "country": "West Bank and Gaza", "region_iso3c": "MEA" }, { "iso3c": "ISR", "x": 18, "y": 11, "country": "Israel", "region_iso3c": "MEA" }, { "iso3c": "TTO", "x": 8, "y": 11, "country": "Trinidad & Tobago", "region_iso3c": "LCN" }, { "iso3c": "PAN", "x": 3, "y": 11, "country": "Panama", "region_iso3c": "LCN" }, { "iso3c": "DZA", "x": 13, "y": 11, "country": "Algeria", "region_iso3c": "MEA" }, { "iso3c": "MAR", "x": 12, "y": 11, "country": "Morocco", "region_iso3c": "MEA" }, { "iso3c": "TUN", "x": 14, "y": 11, "country": "Tunisia", "region_iso3c": "MEA" }, { "iso3c": "QAT", "x": 21, "y": 11, "country": "Qatar", "region_iso3c": "MEA" }, { "iso3c": "MHL", "x": 29, "y": 12, "country": "Marshall Islands", "region_iso3c": "EAS" }, { "iso3c": "SGP", "x": 24, "y": 12, "country": "Singapore", "region_iso3c": "EAS" }, { "iso3c": "EGY", "x": 16, "y": 12, "country": "Egypt", "region_iso3c": "MEA" }, { "iso3c": "LBY", "x": 15, "y": 12, "country": "Libya", "region_iso3c": "MEA" }, { "iso3c": "ARE", "x": 21, "y": 12, "country": "United Arab Emirates", "region_iso3c": "MEA" }, { "iso3c": "OMN", "x": 20, "y": 12, "country": "Oman", "region_iso3c": "MEA" }, { "iso3c": "YEM", "x": 19, "y": 12, "country": "Yemen", "region_iso3c": "MEA" }, { "iso3c": "VEN", "x": 5, "y": 12, "country": "Venezuela", "region_iso3c": "LCN" }, { "iso3c": "GUY", "x": 6, "y": 12, "country": "Guyana", "region_iso3c": "LCN" }, { "iso3c": "SUR", "x": 7, "y": 12, "country": "Suriname", "region_iso3c": "LCN" }, { "iso3c": "MLI", "x": 13, "y": 12, "country": "Mali", "region_iso3c": "SSF" }, { "iso3c": "MRT", "x": 12, "y": 12, "country": "Mauritania", "region_iso3c": "SSF" }, { "iso3c": "NER", "x": 14, "y": 12, "country": "Niger", "region_iso3c": "SSF" }, { "iso3c": "SEN", "x": 11, "y": 12, "country": "Senegal", "region_iso3c": "SSF" }, { "iso3c": "COL", "x": 4, "y": 12, "country": "Colombia", "region_iso3c": "LCN" }, { "iso3c": "PLW", "x": 28, "y": 13, "country": "Palau", "region_iso3c": "EAS" }, { "iso3c": "FSM", "x": 29, "y": 13, "country": "Micronesia (Federated States of)", "region_iso3c": "EAS" }, { "iso3c": "BRN", "x": 25, "y": 13, "country": "Brunei Darussalam", "region_iso3c": "EAS" }, { "iso3c": "CPV", "x": 10, "y": 13, "country": "Cabo Verde", "region_iso3c": "SSF" }, { "iso3c": "SDN", "x": 16, "y": 13, "country": "Sudan", "region_iso3c": "SSF" }, { "iso3c": "TCD", "x": 15, "y": 13, "country": "Chad", "region_iso3c": "SSF" }, { "iso3c": "GMB", "x": 12, "y": 13, "country": "Gambia", "region_iso3c": "SSF" }, { "iso3c": "ECU", "x": 4, "y": 13, "country": "Ecuador", "region_iso3c": "LCN" }, { "iso3c": "BFA", "x": 13, "y": 13, "country": "Burkina Faso", "region_iso3c": "SSF" }, { "iso3c": "DJI", "x": 18, "y": 13, "country": "Djibouti", "region_iso3c": "MEA" }, { "iso3c": "ERI", "x": 17, "y": 13, "country": "Eritrea", "region_iso3c": "SSF" }, { "iso3c": "GNB", "x": 11, "y": 13, "country": "Guinea-Bissau", "region_iso3c": "SSF" }, { "iso3c": "TGO", "x": 14, "y": 13, "country": "Togo", "region_iso3c": "SSF" }, { "iso3c": "BRA", "x": 5, "y": 13, "country": "Brazil", "region_iso3c": "LCN" }, { "iso3c": "KIR", "x": 29, "y": 14, "country": "Kiribati", "region_iso3c": "EAS" }, { "iso3c": "NRU", "x": 28, "y": 14, "country": "Nauru", "region_iso3c": "EAS" }, { "iso3c": "SLB", "x": 27, "y": 14, "country": "Solomon Islands", "region_iso3c": "EAS" }, { "iso3c": "PNG", "x": 26, "y": 14, "country": "Papua New Guinea", "region_iso3c": "EAS" }, { "iso3c": "IDN", "x": 25, "y": 14, "country": "Indonesia", "region_iso3c": "EAS" }, { "iso3c": "PER", "x": 4, "y": 14, "country": "Peru", "region_iso3c": "LCN" }, { "iso3c": "SSD", "x": 16, "y": 14, "country": "South Sudan", "region_iso3c": "SSF" }, { "iso3c": "CAF", "x": 15, "y": 14, "country": "Central African Republic", "region_iso3c": "SSF" }, { "iso3c": "WSM", "x": 1, "y": 14, "country": "Samoa", "region_iso3c": "EAS" }, { "iso3c": "BOL", "x": 5, "y": 14, "country": "Bolivia", "region_iso3c": "LCN" }, { "iso3c": "BEN", "x": 14, "y": 14, "country": "Benin", "region_iso3c": "SSF" }, { "iso3c": "ETH", "x": 17, "y": 14, "country": "Ethiopia", "region_iso3c": "SSF" }, { "iso3c": "GHA", "x": 13, "y": 14, "country": "Ghana", "region_iso3c": "SSF" }, { "iso3c": "LBR", "x": 12, "y": 14, "country": "Liberia", "region_iso3c": "SSF" }, { "iso3c": "SOM", "x": 18, "y": 14, "country": "Somalia", "region_iso3c": "SSF" }, { "iso3c": "GIN", "x": 11, "y": 14, "country": "Guinea", "region_iso3c": "SSF" }, { "iso3c": "URY", "x": 6, "y": 15, "country": "Uruguay", "region_iso3c": "LCN" }, { "iso3c": "PRY", "x": 5, "y": 15, "country": "Paraguay", "region_iso3c": "LCN" }, { "iso3c": "VUT", "x": 28, "y": 15, "country": "Vanuatu", "region_iso3c": "EAS" }, { "iso3c": "TUV", "x": 29, "y": 15, "country": "Tuvalu", "region_iso3c": "EAS" }, { "iso3c": "TLS", "x": 25, "y": 15, "country": "Timor-Leste", "region_iso3c": "EAS" }, { "iso3c": "CHL", "x": 4, "y": 15, "country": "Chile", "region_iso3c": "LCN" }, { "iso3c": "UGA", "x": 16, "y": 15, "country": "Uganda", "region_iso3c": "SSF" }, { "iso3c": "SLE", "x": 11, "y": 15, "country": "Sierra Leone", "region_iso3c": "SSF" }, { "iso3c": "ASM", "x": 1, "y": 15, "country": "American Samoa", "region_iso3c": "EAS" }, { "iso3c": "CMR", "x": 14, "y": 15, "country": "Cameroon", "region_iso3c": "SSF" }, { "iso3c": "CIV", "x": 12, "y": 15, "country": "Côte d'Ivoire", "region_iso3c": "SSF" }, { "iso3c": "NGA", "x": 13, "y": 15, "country": "Nigeria", "region_iso3c": "SSF" }, { "iso3c": "RWA", "x": 15, "y": 15, "country": "Rwanda", "region_iso3c": "SSF" }, { "iso3c": "KEN", "x": 17, "y": 15, "country": "Kenya", "region_iso3c": "SSF" }, { "iso3c": "ARG", "x": 5, "y": 16, "country": "Argentina", "region_iso3c": "LCN" }, { "iso3c": "FJI", "x": 29, "y": 16, "country": "Fiji", "region_iso3c": "EAS" }, { "iso3c": "NCL", "x": 28, "y": 16, "country": "New Caledonia", "region_iso3c": "EAS" }, { "iso3c": "AUS", "x": 26, "y": 16, "country": "Australia", "region_iso3c": "EAS" }, { "iso3c": "PYF", "x": 2, "y": 16, "country": "French Polynesia", "region_iso3c": "EAS" }, { "iso3c": "BDI", "x": 16, "y": 16, "country": "Burundi", "region_iso3c": "SSF" }, { "iso3c": "GNQ", "x": 14, "y": 16, "country": "Equatorial Guinea", "region_iso3c": "SSF" }, { "iso3c": "TZA", "x": 17, "y": 16, "country": "Tanzania", "region_iso3c": "SSF" }, { "iso3c": "SYC", "x": 19, "y": 16, "country": "Seychelles", "region_iso3c": "SSF" }, { "iso3c": "GAB", "x": 13, "y": 16, "country": "Gabon", "region_iso3c": "SSF" }, { "iso3c": "COD", "x": 15, "y": 16, "country": "Congo (Democratic Republic of the)", "region_iso3c": "SSF" }, { "iso3c": "COG", "x": 13, "y": 17, "country": "Congo", "region_iso3c": "SSF" }, { "iso3c": "NZL", "x": 27, "y": 17, "country": "New Zealand", "region_iso3c": "EAS" }, { "iso3c": "MOZ", "x": 16, "y": 17, "country": "Mozambique", "region_iso3c": "SSF" }, { "iso3c": "TON", "x": 1, "y": 17, "country": "Tonga", "region_iso3c": "EAS" }, { "iso3c": "MWI", "x": 15, "y": 17, "country": "Malawi", "region_iso3c": "SSF" }, { "iso3c": "COM", "x": 18, "y": 17, "country": "Comoros", "region_iso3c": "SSF" }, { "iso3c": "STP", "x": 11, "y": 17, "country": "Sao Tome and Principe", "region_iso3c": "SSF" }, { "iso3c": "ZMB", "x": 14, "y": 17, "country": "Zambia", "region_iso3c": "SSF" }, { "iso3c": "ZWE", "x": 15, "y": 18, "country": "Zimbabwe", "region_iso3c": "SSF" }, { "iso3c": "AGO", "x": 13, "y": 18, "country": "Angola", "region_iso3c": "SSF" }, { "iso3c": "MDG", "x": 19, "y": 18, "country": "Madagascar", "region_iso3c": "SSF" }, { "iso3c": "MUS", "x": 20, "y": 18, "country": "Mauritius", "region_iso3c": "SSF" }, { "iso3c": "BWA", "x": 14, "y": 18, "country": "Botswana", "region_iso3c": "SSF" }, { "iso3c": "NAM", "x": 13, "y": 19, "country": "Namibia", "region_iso3c": "SSF" }, { "iso3c": "SWZ", "x": 14, "y": 19, "country": "Swaziland", "region_iso3c": "SSF" }, { "iso3c": "LSO", "x": 15, "y": 19, "country": "Lesotho", "region_iso3c": "SSF" }, { "iso3c": "ZAF", "x": 14, "y": 20, "country": "South Africa", "region_iso3c": "SSF" }, { "iso3c": "ATA", "x": 14, "y": 22, "country": "Antarctica" }];
  mark_module_start();
  WorldSquareGrid[FILENAME] = "src/WorldSquareGrid.svelte";
  var on_mouseover = (_, currentCountry, cell, searched, tooltipVisible) => {
    currentCountry(get(cell).iso3c);
    searched(false);
    tooltipVisible(true);
  };
  var on_mouseout = (__1, currentCountry, tooltipVisible) => {
    currentCountry(null);
    tooltipVisible(false);
  };
  var root_3$2 = add_locations(/* @__PURE__ */ ns_template(`<text class="country-label svelte-buoy2n" paint-order="stroke" stroke-linejoin="round"> </text>`), WorldSquareGrid[FILENAME], [[85, 8]]);
  var root_2$2 = add_locations(/* @__PURE__ */ ns_template(`<g><rect></rect><!></g>`), WorldSquareGrid[FILENAME], [[47, 4, [[52, 6]]]]);
  var root_4$1 = add_locations(/* @__PURE__ */ ns_template(`<rect class="highlight-outline svelte-buoy2n"></rect><rect class="highlight-outline svelte-buoy2n"></rect>`, 1), WorldSquareGrid[FILENAME], [[102, 2], [112, 2]]);
  var root$7 = add_locations(/* @__PURE__ */ ns_template(`<!><!>`, 1), WorldSquareGrid[FILENAME], []);
  function WorldSquareGrid($$anchor, $$props) {
    check_target(new.target);
    push($$props, true, WorldSquareGrid);
    let currentCountry = prop($$props, "currentCountry", 15), currentTilePos = prop($$props, "currentTilePos", 15), searched = prop($$props, "searched", 15), tooltipVisible = prop($$props, "tooltipVisible", 15);
    let valueType = /* @__PURE__ */ derived(() => $$props.data.plotdata.metadata.color.type);
    let tileSize = /* @__PURE__ */ derived(() => Math.min(($$props.width - $$props.margins.left - $$props.margins.right) / 29, ($$props.height - $$props.margins.top - $$props.margins.bottom) / 22));
    let currentTile = /* @__PURE__ */ derived(() => squareGrid.find((d) => equals(d.iso3c, currentCountry())));
    let gridWidth = /* @__PURE__ */ derived(() => get(tileSize) * 29);
    let shift2 = /* @__PURE__ */ derived(() => ($$props.width - get(gridWidth)) / 2);
    user_effect(() => {
      if (currentCountry()) {
        currentTilePos({
          x: get(currentTile).x * get(tileSize) - get(tileSize),
          y: get(currentTile).y * get(tileSize) + get(tileSize)
        });
      }
    });
    var fragment = root$7();
    var node = first_child(fragment);
    {
      var consequent_1 = ($$anchor2) => {
        var fragment_1 = comment();
        var node_1 = first_child(fragment_1);
        each(node_1, 17, () => squareGrid, index, ($$anchor3, cell) => {
          var g = root_2$2();
          var rect = child(g);
          set_attribute(rect, "x", 0);
          set_attribute(rect, "y", 0);
          rect.__mouseover = [
            on_mouseover,
            currentCountry,
            cell,
            searched,
            tooltipVisible
          ];
          rect.__mouseout = [on_mouseout, currentCountry, tooltipVisible];
          var node_2 = sibling(rect);
          {
            var consequent = ($$anchor4) => {
              var text = root_3$2();
              set_attribute(text, "text-anchor", "middle");
              set_attribute(text, "font-size", "0.6rem");
              set_attribute(text, "stroke", "#ffffff");
              set_attribute(text, "stroke-width", 2);
              var text_1 = child(text);
              template_effect(() => {
                set_attribute(text, "x", get(tileSize) / 2);
                set_attribute(text, "y", get(tileSize) / 2 + 4);
                set_text(text_1, get(cell).iso3c);
              });
              append($$anchor4, text);
            };
            if_block(node_2, ($$render) => {
              if ($$props.countryCodes && get(tileSize)) $$render(consequent);
            });
          }
          template_effect(
            ($0) => {
              set_attribute(g, "transform", `translate(${(get(cell).x - 1) * get(tileSize) + get(shift2)},${(get(cell).y - 1) * get(tileSize)})`);
              set_attribute(rect, "width", get(tileSize));
              set_attribute(rect, "height", get(tileSize));
              set_attribute(rect, "fill", $0);
              set_attribute(rect, "stroke", $$props.stroke);
              set_attribute(rect, "stroke-width", $$props.strokeWidth);
            },
            [
              () => $$props.data.plotdata.find((d) => equals(d.iso3c, get(cell).iso3c)) && equals($$props.data.plotdata.find((d) => equals(d.iso3c, get(cell).iso3c)).color, null, false) ? equals(get(valueType), "string") ? $$props.categoricalColorScale($$props.data.plotdata.find((d) => equals(d.iso3c, get(cell).iso3c)).color) : $$props.numericalColorScale($$props.data.plotdata.find((d) => equals(d.iso3c, get(cell).iso3c)).color) : $$props.noDataColor
            ]
          );
          event("focus", rect, () => {
            currentCountry(get(cell).iso3c);
            searched(false);
            tooltipVisible(true);
          });
          event("blur", rect, () => {
            currentCountry(null);
            tooltipVisible(false);
          });
          append($$anchor3, g);
        });
        append($$anchor2, fragment_1);
      };
      if_block(node, ($$render) => {
        if (get(tileSize)) $$render(consequent_1);
      });
    }
    var node_3 = sibling(node);
    {
      var consequent_2 = ($$anchor2) => {
        var fragment_2 = root_4$1();
        var rect_1 = first_child(fragment_2);
        set_attribute(rect_1, "fill", "none");
        set_attribute(rect_1, "stroke", "#FFFFFF");
        var rect_2 = sibling(rect_1);
        set_attribute(rect_2, "fill", "none");
        set_attribute(rect_2, "stroke", "#000000");
        template_effect(() => {
          set_attribute(rect_1, "x", get(currentTile).x * get(tileSize) - get(tileSize) + get(shift2));
          set_attribute(rect_1, "y", get(currentTile).y * get(tileSize) - get(tileSize));
          set_attribute(rect_1, "width", get(tileSize));
          set_attribute(rect_1, "height", get(tileSize));
          set_attribute(rect_1, "stroke-width", $$props.strokeWidth + 2);
          set_attribute(rect_2, "x", get(currentTile).x * get(tileSize) - get(tileSize) + get(shift2));
          set_attribute(rect_2, "y", get(currentTile).y * get(tileSize) - get(tileSize));
          set_attribute(rect_2, "width", get(tileSize));
          set_attribute(rect_2, "height", get(tileSize));
          set_attribute(rect_2, "stroke-width", $$props.strokeWidth);
        });
        append($$anchor2, fragment_2);
      };
      if_block(node_3, ($$render) => {
        if (currentCountry()) $$render(consequent_2);
      });
    }
    append($$anchor, fragment);
    return pop({ ...legacy_api() });
  }
  mark_module_end(WorldSquareGrid);
  delegate(["mouseover", "mouseout"]);
  mark_module_start();
  NumericalColorLegend[FILENAME] = "src/template/NumericalColorLegend.svelte";
  var root_1$2 = add_locations(/* @__PURE__ */ template2(`<div class="no-data-label svelte-1af89zx"> </div>`), NumericalColorLegend[FILENAME], [[103, 6]]);
  var root_2$1 = add_locations(/* @__PURE__ */ template2(`<div class="no-data"><div class="no-data-symbol svelte-1af89zx"><svg class="no-data-symbol svelte-1af89zx"><rect class="no-data-rect"></rect></svg></div></div>`), NumericalColorLegend[FILENAME], [
    [
      115,
      6,
      [
        [
          116,
          8,
          [[117, 10, [[118, 12]]]]
        ]
      ]
    ]
  ]);
  var root_4 = add_locations(/* @__PURE__ */ ns_template(`<text class="tick-label svelte-1af89zx"> </text>`), NumericalColorLegend[FILENAME], [[150, 14]]);
  var root_6 = add_locations(/* @__PURE__ */ ns_template(`<text class="tick-label svelte-1af89zx"> </text>`), NumericalColorLegend[FILENAME], [[156, 16]]);
  var root_3$1 = add_locations(/* @__PURE__ */ ns_template(`<image class="gradient svelte-1af89zx" preserveAspectRatio="none"></image><rect class="gradient-border svelte-1af89zx"></rect><g class="ticks"><!><!></g>`, 1), NumericalColorLegend[FILENAME], [[132, 10], [141, 10], [148, 10]]);
  var root_8$1 = add_locations(/* @__PURE__ */ ns_template(`<rect></rect>`), NumericalColorLegend[FILENAME], [[165, 12]]);
  var root_9 = add_locations(/* @__PURE__ */ ns_template(`<text class="tick-label svelte-1af89zx"> </text>`), NumericalColorLegend[FILENAME], [[176, 12]]);
  var root_7 = add_locations(/* @__PURE__ */ ns_template(`<!><!>`, 1), NumericalColorLegend[FILENAME], []);
  var root$6 = add_locations(/* @__PURE__ */ template2(`<div><div class="legend-text-container svelte-1af89zx"><!> <div class="legend-title svelte-1af89zx"><span> </span>&nbsp;<span class="label-unit svelte-1af89zx"> </span></div></div> <div class="gradient-container svelte-1af89zx"><!> <div class="gradient svelte-1af89zx"><svg class="svelte-1af89zx"><!><!></svg></div></div></div>`), NumericalColorLegend[FILENAME], [
    [
      100,
      0,
      [
        [
          101,
          2,
          [
            [107, 4, [[108, 6], [108, 32]]]
          ]
        ],
        [
          113,
          2,
          [[129, 4, [[130, 6]]]]
        ]
      ]
    ]
  ]);
  function NumericalColorLegend($$anchor, $$props) {
    check_target(new.target);
    push($$props, true, NumericalColorLegend);
    let tickLabels = prop($$props, "tickLabels", 19, () => []);
    let tickSize = 12;
    let height = 12 + tickSize;
    const margin = {
      top: 0,
      right: 14,
      left: 0
    };
    let domain = /* @__PURE__ */ derived(() => {
      const d = $$props.numericalColorScale.domain();
      if (equals(d.length, 2)) {
        return [d[0], d[0] + (d[1] - d[0]) / 2, d[1]];
      } else {
        return d;
      }
    });
    function ramp(color2, n2 = 256) {
      const canvas = document.createElement("canvas");
      canvas.width = n2;
      canvas.height = 1;
      const context = canvas.getContext("2d");
      for (let i = 0; i < n2; ++i) {
        context.fillStyle = color2(i / (n2 - 1));
        context.fillRect(i, 0, 1, 1);
      }
      return canvas;
    }
    let n = /* @__PURE__ */ derived(() => {
      if ($$props.numericalColorScale.interpolate) {
        return Math.min($$props.numericalColorScale.domain().length, $$props.numericalColorScale.range().length);
      }
      if ($$props.numericalColorScale.interpolator) {
        return;
      }
    });
    let x = /* @__PURE__ */ derived(() => {
      if ($$props.numericalColorScale.interpolate) {
        return $$props.numericalColorScale.copy().rangeRound(quantize$1(interpolate(margin.left, get(gradientWidth) - margin.right), get(n)));
      }
      if ($$props.numericalColorScale.interpolator) {
        return Object.assign($$props.numericalColorScale.copy().interpolator(interpolateRound(margin.left, get(gradientWidth) - margin.right)), {
          range() {
            return [
              margin.left,
              get(gradientWidth) - margin.right
            ];
          }
        });
      }
    });
    let href = /* @__PURE__ */ derived(() => {
      if ($$props.numericalColorScale.interpolate) {
        return ramp($$props.numericalColorScale.copy().domain(quantize$1(interpolate(0, 1), get(n)))).toDataURL();
      }
      if ($$props.numericalColorScale.interpolator) {
        return ramp($$props.numericalColorScale.interpolator()).toDataURL();
      }
    });
    let noDataWidth = /* @__PURE__ */ derived(() => $$props.includeNoData ? 70 : 0);
    let gradientWidth = state$1(0);
    let discreteTicks = /* @__PURE__ */ derived(() => equals($$props.linearOrBinned, "linear") ? [] : equals($$props.binningMode, "fixedWidth") ? $$props.numericalColorScale.thresholds() : $$props.numericalColorScale.quantiles());
    var div = root$6();
    set_class(div, 1, "legend svelte-1af89zx");
    var div_1 = child(div);
    var node = child(div_1);
    {
      var consequent = ($$anchor2) => {
        var div_2 = root_1$2();
        var text = child(div_2);
        template_effect(() => {
          set_style(div_2, "width", get(noDataWidth) + "px");
          set_text(text, $$props.noDataLabel);
        });
        append($$anchor2, div_2);
      };
      if_block(node, ($$render) => {
        if ($$props.includeNoData) $$render(consequent);
      });
    }
    var div_3 = sibling(node, 2);
    var span = child(div_3);
    var text_1 = child(span);
    var span_1 = sibling(span, 2);
    var text_2 = child(span_1);
    var div_4 = sibling(div_1, 2);
    var node_1 = child(div_4);
    {
      var consequent_1 = ($$anchor2) => {
        var div_5 = root_2$1();
        var div_6 = child(div_5);
        var svg = child(div_6);
        set_attribute(svg, "height", height);
        var rect = child(svg);
        set_attribute(rect, "x", 0);
        set_attribute(rect, "y", 0);
        set_attribute(rect, "height", 10);
        template_effect(() => {
          set_style(div_5, "width", get(noDataWidth) + "px");
          set_style(div_6, "width", get(noDataWidth) + "px");
          set_attribute(svg, "width", get(noDataWidth));
          set_attribute(rect, "width", get(noDataWidth));
        });
        append($$anchor2, div_5);
      };
      if_block(node_1, ($$render) => {
        if ($$props.includeNoData) $$render(consequent_1);
      });
    }
    var div_7 = sibling(node_1, 2);
    var svg_1 = child(div_7);
    set_attribute(svg_1, "width", "100%");
    set_attribute(svg_1, "height", height);
    var node_2 = child(svg_1);
    {
      var consequent_3 = ($$anchor2) => {
        var fragment = root_3$1();
        var image = first_child(fragment);
        set_attribute(image, "height", 10);
        var rect_1 = sibling(image);
        set_attribute(rect_1, "height", 10);
        var g = sibling(rect_1);
        var node_3 = child(g);
        each(node_3, 17, tickLabels, index, ($$anchor3, tick) => {
          var text_3 = root_4();
          var text_4 = child(text_3);
          template_effect(
            ($0) => {
              set_attribute(text_3, "x", $0);
              set_attribute(text_3, "y", margin.top + 24);
              set_text(text_4, get(tick).label);
            },
            [() => get(x)(get(tick).value)]
          );
          append($$anchor3, text_3);
        });
        var node_4 = sibling(node_3);
        {
          var consequent_2 = ($$anchor3) => {
            var fragment_1 = comment();
            var node_5 = first_child(fragment_1);
            each(node_5, 17, () => get(domain), index, ($$anchor4, tick) => {
              var text_5 = root_6();
              var text_6 = child(text_5);
              template_effect(
                ($0) => {
                  set_attribute(text_5, "x", $0);
                  set_attribute(text_5, "y", margin.top + 24);
                  set_text(text_6, get(tick));
                },
                [() => get(x)(get(tick))]
              );
              append($$anchor4, text_5);
            });
            append($$anchor3, fragment_1);
          };
          if_block(node_4, ($$render) => {
            if (strict_equals(tickLabels().length, 0)) $$render(consequent_2);
          });
        }
        template_effect(() => {
          set_attribute(image, "x", margin.left);
          set_attribute(image, "y", margin.top);
          set_attribute(image, "width", get(gradientWidth) - margin.left - margin.right);
          set_xlink_attribute(image, "xlink:href", get(href));
          set_attribute(rect_1, "x", margin.left);
          set_attribute(rect_1, "y", margin.top);
          set_attribute(rect_1, "width", get(gradientWidth) - margin.left - margin.right);
        });
        append($$anchor2, fragment);
      };
      if_block(node_2, ($$render) => {
        if (equals($$props.linearOrBinned, "linear") && get(gradientWidth)) $$render(consequent_3);
      });
    }
    var node_6 = sibling(node_2);
    {
      var consequent_4 = ($$anchor2) => {
        var fragment_2 = root_7();
        var node_7 = first_child(fragment_2);
        each(node_7, 17, () => $$props.numericalColorScale.range(), index, ($$anchor3, bin, i) => {
          var rect_2 = root_8$1();
          set_class(rect_2, 0, "bin-color svelte-1af89zx");
          set_attribute(rect_2, "height", 10);
          template_effect(
            ($0, $1) => {
              set_attribute(rect_2, "x", $0);
              set_attribute(rect_2, "y", margin.top);
              set_attribute(rect_2, "width", $1);
              set_attribute(rect_2, "fill", get(bin));
            },
            [
              () => margin.left + i * get(gradientWidth) / $$props.numericalColorScale.range().length,
              () => get(gradientWidth) / $$props.numericalColorScale.range().length
            ]
          );
          append($$anchor3, rect_2);
        });
        var node_8 = sibling(node_7);
        each(node_8, 17, () => get(discreteTicks), index, ($$anchor3, tick, i) => {
          var text_7 = root_9();
          var text_8 = child(text_7);
          template_effect(
            ($0, $1) => {
              set_attribute(text_7, "x", $0);
              set_attribute(text_7, "y", margin.top + 24);
              set_text(text_8, $1);
            },
            [
              () => margin.left + (i + 1) * get(gradientWidth) / $$props.numericalColorScale.range().length,
              () => Math.round(get(tick) * 10) / 10
            ]
          );
          append($$anchor3, text_7);
        });
        append($$anchor2, fragment_2);
      };
      if_block(node_6, ($$render) => {
        if (equals($$props.linearOrBinned, "binned")) $$render(consequent_4);
      });
    }
    template_effect(() => {
      set_text(text_1, $$props.title);
      set_text(text_2, $$props.unitLabel ? "(" + $$props.unitLabel + ")" : "");
    });
    bind_element_size(div_7, "clientWidth", ($$value) => set(gradientWidth, $$value));
    append($$anchor, div);
    return pop({ ...legacy_api() });
  }
  mark_module_end(NumericalColorLegend);
  mark_module_start();
  CategoricalColorLegend[FILENAME] = "src/template/CategoricalColorLegend.svelte";
  var root_1$1 = add_locations(/* @__PURE__ */ template2(`<div class="pill-container svelte-1ervix3"><div></div> <div> </div></div>`), CategoricalColorLegend[FILENAME], [[14, 8, [[15, 10], [19, 10]]]]);
  var root_2 = add_locations(/* @__PURE__ */ template2(`<div class="pill-container svelte-1ervix3"><div></div> <div> </div></div>`), CategoricalColorLegend[FILENAME], [[23, 6, [[24, 8], [25, 8]]]]);
  var root$5 = add_locations(/* @__PURE__ */ template2(`<div><div class="legend-text-container svelte-1ervix3"><div class="legend-title svelte-1ervix3"><span> </span></div></div> <div class="categorical-legend svelte-1ervix3" aria-hidden="true"><!> <!></div></div>`), CategoricalColorLegend[FILENAME], [
    [
      6,
      0,
      [
        [7, 2, [[8, 4, [[9, 6]]]]],
        [12, 2]
      ]
    ]
  ]);
  function CategoricalColorLegend($$anchor, $$props) {
    check_target(new.target);
    push($$props, true, CategoricalColorLegend);
    var div = root$5();
    set_class(div, 1, "legend svelte-1ervix3");
    var div_1 = child(div);
    var div_2 = child(div_1);
    var span = child(div_2);
    var text = child(span);
    var div_3 = sibling(div_1, 2);
    var node = child(div_3);
    each(node, 17, () => $$props.categoricalColorScale.domain(), index, ($$anchor2, item) => {
      var div_4 = root_1$1();
      var div_5 = child(div_4);
      set_class(div_5, 1, `pill circle`, "svelte-1ervix3");
      var div_6 = sibling(div_5, 2);
      set_class(div_6, 1, "label svelte-1ervix3");
      var text_1 = child(div_6);
      template_effect(
        ($0) => {
          set_style(div_5, "background-color", $0);
          set_text(text_1, get(item));
        },
        [
          () => $$props.categoricalColorScale(get(item))
        ]
      );
      append($$anchor2, div_4);
    });
    var node_1 = sibling(node, 2);
    {
      var consequent = ($$anchor2) => {
        var div_7 = root_2();
        var div_8 = child(div_7);
        set_class(div_8, 1, `pill circle`, "svelte-1ervix3");
        var div_9 = sibling(div_8, 2);
        set_class(div_9, 1, "label small svelte-1ervix3");
        var text_2 = child(div_9);
        template_effect(() => {
          set_style(div_8, "background-color", wbColors.noData);
          set_text(text_2, $$props.noDataLabel);
        });
        append($$anchor2, div_7);
      };
      if_block(node_1, ($$render) => {
        if ($$props.includeNoData) $$render(consequent);
      });
    }
    template_effect(() => set_text(text, $$props.title));
    append($$anchor, div);
    return pop({ ...legacy_api() });
  }
  mark_module_end(CategoricalColorLegend);
  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  const createCoords = (v) => ({
    x: v,
    y: v
  });
  const oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  const oppositeAlignmentMap = {
    start: "end",
    end: "start"
  };
  function clamp(start, value, end) {
    return max(start, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === "function" ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split("-")[0];
  }
  function getAlignment(placement) {
    return placement.split("-")[1];
  }
  function getOppositeAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function getAxisLength(axis) {
    return axis === "y" ? "height" : "width";
  }
  function getSideAxis(placement) {
    return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
  }
  function getSideList(side, isStart, rtl) {
    const lr = ["left", "right"];
    const rl = ["right", "left"];
    const tb = ["top", "bottom"];
    const bt = ["bottom", "top"];
    switch (side) {
      case "top":
      case "bottom":
        if (rtl) return isStart ? rl : lr;
        return isStart ? lr : rl;
      case "left":
      case "right":
        return isStart ? tb : bt;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === "start", rtl);
    if (alignment) {
      list = list.map((side) => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
  }
  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }
  function getPaddingObject(padding) {
    return typeof padding !== "number" ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    const {
      x,
      y,
      width,
      height
    } = rect;
    return {
      width,
      height,
      top: y,
      left: x,
      right: x + width,
      bottom: y + height,
      x,
      y
    };
  }
  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === "y";
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case "top":
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case "bottom":
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case "right":
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case "left":
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case "start":
        coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case "end":
        coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }
  const computePosition$1 = async (reference, floating, config) => {
    const {
      placement = "bottom",
      strategy = "absolute",
      middleware = [],
      platform: platform2
    } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
    let rects = await platform2.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i = 0; i < validMiddleware.length; i++) {
      const {
        name,
        fn
      } = validMiddleware[i];
      const {
        x: nextX,
        y: nextY,
        data: data2,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform: platform2,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data2
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === "object") {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform2.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i = -1;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };
  async function detectOverflow(state2, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x,
      y,
      platform: platform2,
      rects,
      elements,
      strategy
    } = state2;
    const {
      boundary = "clippingAncestors",
      rootBoundary = "viewport",
      elementContext = "floating",
      altBoundary = false,
      padding = 0
    } = evaluate(options, state2);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === "floating" ? "reference" : "floating";
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
      element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === "floating" ? {
      x,
      y,
      width: rects.floating.width,
      height: rects.floating.height
    } : rects.reference;
    const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
    const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }
  const flip$1 = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "flip",
      options,
      async fn(state2) {
        var _middlewareData$arrow, _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform: platform2,
          elements
        } = state2;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = "bestFit",
          fallbackAxisSideDirection = "none",
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state2);
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const initialSideAxis = getSideAxis(initialPlacement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
        if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements = [initialPlacement, ...fallbackPlacements];
        const overflow = await detectOverflow(state2, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides[0]], overflow[sides[1]]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];
        if (!overflows.every((side2) => side2 <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements[nextIndex];
          if (nextPlacement) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
          let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case "bestFit": {
                var _overflowsData$filter2;
                const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === "y";
                  }
                  return true;
                }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement2) {
                  resetPlacement = placement2;
                }
                break;
              }
              case "initialPlacement":
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };
  async function convertValueToCoords(state2, options) {
    const {
      placement,
      platform: platform2,
      elements
    } = state2;
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === "y";
    const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state2);
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === "number" ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: rawValue.mainAxis || 0,
      crossAxis: rawValue.crossAxis || 0,
      alignmentAxis: rawValue.alignmentAxis
    };
    if (alignment && typeof alignmentAxis === "number") {
      crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }
  const offset$1 = function(options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: "offset",
      options,
      async fn(state2) {
        var _middlewareData$offse, _middlewareData$arrow;
        const {
          x,
          y,
          placement,
          middlewareData
        } = state2;
        const diffCoords = await convertValueToCoords(state2, options);
        if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: {
            ...diffCoords,
            placement
          }
        };
      }
    };
  };
  const shift$1 = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "shift",
      options,
      async fn(state2) {
        const {
          x,
          y,
          placement
        } = state2;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: (_ref) => {
              let {
                x: x2,
                y: y2
              } = _ref;
              return {
                x: x2,
                y: y2
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state2);
        const coords = {
          x,
          y
        };
        const overflow = await detectOverflow(state2, detectOverflowOptions);
        const crossAxis = getSideAxis(getSide(placement));
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === "y" ? "top" : "left";
          const maxSide = mainAxis === "y" ? "bottom" : "right";
          const min2 = mainAxisCoord + overflow[minSide];
          const max2 = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = clamp(min2, mainAxisCoord, max2);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === "y" ? "top" : "left";
          const maxSide = crossAxis === "y" ? "bottom" : "right";
          const min2 = crossAxisCoord + overflow[minSide];
          const max2 = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = clamp(min2, crossAxisCoord, max2);
        }
        const limitedCoords = limiter.fn({
          ...state2,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y,
            enabled: {
              [mainAxis]: checkMainAxis,
              [crossAxis]: checkCrossAxis
            }
          }
        };
      }
    };
  };
  function hasWindow() {
    return typeof window !== "undefined";
  }
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || "").toLowerCase();
    }
    return "#document";
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (!hasWindow() || typeof ShadowRoot === "undefined") {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
  }
  function isTableElement(element) {
    return ["table", "td", "th"].includes(getNodeName(element));
  }
  function isTopLayer(element) {
    return [":popover-open", ":modal"].some((selector) => {
      try {
        return element.matches(selector);
      } catch (e) {
        return false;
      }
    });
  }
  function isContainingBlock(elementOrCss) {
    const webkit = isWebKit();
    const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;
    return ["transform", "translate", "scale", "rotate", "perspective"].some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else if (isTopLayer(currentNode)) {
        return null;
      }
      currentNode = getParentNode(currentNode);
    }
    return null;
  }
  function isWebKit() {
    if (typeof CSS === "undefined" || !CSS.supports) return false;
    return CSS.supports("-webkit-backdrop-filter", "none");
  }
  function isLastTraversableNode(node) {
    return ["html", "body", "#document"].includes(getNodeName(node));
  }
  function getComputedStyle(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.scrollX,
      scrollTop: element.scrollY
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === "html") {
      return node;
    }
    const result = (
      // Step into the shadow DOM of the parent of a slotted node.
      node.assignedSlot || // DOM Element detected.
      node.parentNode || // ShadowRoot detected.
      isShadowRoot(node) && node.host || // Fallback.
      getDocumentElement(node)
    );
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      getFrameElement(win);
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, []));
  }
  function getFrameElement(win) {
    return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
  }
  function getCssDimensions(element) {
    const css = getComputedStyle(element);
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }
  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }
  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $
    } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;
    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }
  const noOffsets = /* @__PURE__ */ createCoords(0);
  function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
      return false;
    }
    return isFixed;
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentWin = win;
      let currentIFrame = getFrameElement(currentWin);
      while (currentIFrame && offsetParent && offsetWin !== currentWin) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentWin = getWindow(currentIFrame);
        currentIFrame = getFrameElement(currentWin);
      }
    }
    return rectToClientRect({
      width,
      height,
      x,
      y
    });
  }
  function getWindowScrollBarX(element, rect) {
    const leftScroll = getNodeScroll(element).scrollLeft;
    if (!rect) {
      return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
    }
    return rect.left + leftScroll;
  }
  function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
    if (ignoreScrollbarX === void 0) {
      ignoreScrollbarX = false;
    }
    const htmlRect = documentElement.getBoundingClientRect();
    const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
      // RTL <body> scrollbar.
      getWindowScrollBarX(documentElement, htmlRect)
    ));
    const y = htmlRect.top + scroll.scrollTop;
    return {
      x,
      y
    };
  }
  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      elements,
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isFixed = strategy === "fixed";
    const documentElement = getDocumentElement(offsetParent);
    const topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
    };
  }
  function getClientRects(element) {
    return Array.from(element.getClientRects());
  }
  function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if (getComputedStyle(body).direction === "rtl") {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isWebKit();
      if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === "viewport") {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === "document") {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y,
        width: clippingAncestor.width,
        height: clippingAncestor.height
      };
    }
    return rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
  }
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element, []).filter((el) => isElement(el) && getNodeName(el) !== "body");
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle(element).position === "fixed";
    let currentNode = elementIsFixed ? getParentNode(element) : element;
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === "fixed") {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        result = result.filter((ancestor) => ancestor !== currentNode);
      } else {
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }
  function getDimensions(element) {
    const {
      width,
      height
    } = getCssDimensions(element);
    return {
      width,
      height
    };
  }
  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === "fixed";
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
    const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
    return {
      x,
      y,
      width: rect.width,
      height: rect.height
    };
  }
  function isStaticPositioned(element) {
    return getComputedStyle(element).position === "static";
  }
  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    let rawOffsetParent = element.offsetParent;
    if (getDocumentElement(element) === rawOffsetParent) {
      rawOffsetParent = rawOffsetParent.ownerDocument.body;
    }
    return rawOffsetParent;
  }
  function getOffsetParent(element, polyfill) {
    const win = getWindow(element);
    if (isTopLayer(element)) {
      return win;
    }
    if (!isHTMLElement(element)) {
      let svgOffsetParent = getParentNode(element);
      while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
        if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
          return svgOffsetParent;
        }
        svgOffsetParent = getParentNode(svgOffsetParent);
      }
      return win;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
      return win;
    }
    return offsetParent || getContainingBlock(element) || win;
  }
  const getElementRects = async function(data2) {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    const floatingDimensions = await getDimensionsFn(data2.floating);
    return {
      reference: getRectRelativeToOffsetParent(data2.reference, await getOffsetParentFn(data2.floating), data2.strategy),
      floating: {
        x: 0,
        y: 0,
        width: floatingDimensions.width,
        height: floatingDimensions.height
      }
    };
  };
  function isRTL(element) {
    return getComputedStyle(element).direction === "rtl";
  }
  const platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };
  const offset = offset$1;
  const shift = shift$1;
  const flip = flip$1;
  const computePosition = (reference, floating, options) => {
    const cache = /* @__PURE__ */ new Map();
    const mergedOptions = {
      platform,
      ...options
    };
    const platformWithCache = {
      ...mergedOptions.platform,
      _c: cache
    };
    return computePosition$1(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };
  mark_module_start();
  Tooltip[FILENAME] = "src/template/Tooltip.svelte";
  var root$4 = add_locations(/* @__PURE__ */ template2(`<div><!></div>`), Tooltip[FILENAME], [[46, 0]]);
  function Tooltip($$anchor, $$props) {
    check_target(new.target);
    push($$props, true, Tooltip);
    let placement = prop($$props, "placement", 3, "right"), showBackground = prop($$props, "showBackground", 3, true);
    let component;
    let lastTargetPos = { x: 0, y: 0 };
    let x = /* @__PURE__ */ derived(() => $$props.targetPos.x);
    let y = /* @__PURE__ */ derived(() => $$props.targetPos.y);
    user_effect(() => {
      if (component && $$props.targetPos && (strict_equals($$props.targetPos.x, lastTargetPos.x, false) || strict_equals($$props.targetPos.y, lastTargetPos.y, false))) {
        lastTargetPos = { ...$$props.targetPos };
        const virtualTarget = {
          getBoundingClientRect() {
            return {
              width: 0,
              height: 0,
              x: get(x),
              y: get(y),
              top: get(y),
              left: get(x),
              right: get(x),
              bottom: get(y)
            };
          }
        };
        computePosition(virtualTarget, component, {
          placement: placement(),
          middleware: [
            offset(24),
            flip(),
            shift({ padding: 5 })
          ]
        }).then(({ x: x2, y: y2 }) => {
          component.style.left = x2 + "px";
          component.style.top = y2 + "px";
        });
      }
    });
    var div = root$4();
    let classes;
    var node = child(div);
    snippet(node, () => $$props.children ?? noop);
    bind_this(div, ($$value) => component = $$value, () => component);
    template_effect(() => classes = set_class(div, 1, "tooltip svelte-1jlc8vz", null, classes, {
      visible: $$props.visible,
      background: strict_equals(showBackground(), true)
    }));
    append($$anchor, div);
    return pop({ ...legacy_api() });
  }
  mark_module_end(Tooltip);
  mark_module_start();
  TooltipContent[FILENAME] = "src/template/TooltipContent.svelte";
  var root$3 = add_locations(/* @__PURE__ */ template2(`<div class="tooltip-container svelte-7erzzb"><h3> </h3> <div> </div></div>`), TooltipContent[FILENAME], [[5, 0, [[6, 2], [7, 2]]]]);
  function TooltipContent($$anchor, $$props) {
    check_target(new.target);
    push($$props, true, TooltipContent);
    var div = root$3();
    var h3 = child(div);
    set_class(h3, 1, "tooltip-header svelte-7erzzb");
    var text = child(h3);
    var div_1 = sibling(h3, 2);
    set_class(div_1, 1, "tooltip-content svelte-7erzzb");
    var text_1 = child(div_1);
    template_effect(() => {
      set_text(text, $$props.tooltipHeader);
      set_text(text_1, $$props.tooltipBody);
    });
    append($$anchor, div);
    return pop({ ...legacy_api() });
  }
  mark_module_end(TooltipContent);
  enable_legacy_mode_flag();
  mark_module_start();
  Objects[FILENAME] = "src/Objects.svelte";
  var root$2 = add_locations(/* @__PURE__ */ template2(`<li class="typeahead-result svelte-s0cyhm"> </li>`), Objects[FILENAME], [[5, 0]]);
  function Objects($$anchor, $$props) {
    check_target(new.target);
    push($$props, false, Objects);
    let object2 = prop($$props, "object", 8);
    init();
    var li = root$2();
    var text = child(li);
    template_effect(() => set_text(text, object2().label));
    event("mousedown", li, function($$arg) {
      bubble_event.call(this, $$props, $$arg);
    });
    append($$anchor, li);
    return pop({ ...legacy_api() });
  }
  mark_module_end(Objects);
  mark_module_start();
  SearchBox[FILENAME] = "src/SearchBox.svelte";
  const typeahead = (_, $$props, searchInput, results) => {
    let resultsIncludes = $$props.data.filter((d) => d.label.toLowerCase().includes(get(searchInput).toLowerCase()));
    let resultsStartWith = $$props.data.filter((d) => d.label.toLowerCase().startsWith(get(searchInput).toLowerCase()));
    set(results, proxy(resultsStartWith.sort().concat(resultsIncludes.sort()), null, results));
    set(results, proxy([...new Set(get(results))], null, results));
  };
  var root_1 = add_locations(/* @__PURE__ */ template2(`<ul class="typeahead-object-list svelte-6s1u2p"><!></ul>`), SearchBox[FILENAME], [[33, 3]]);
  var root$1 = add_locations(/* @__PURE__ */ template2(`<div class="typeahead svelte-6s1u2p"><input id="searchfield" type="text" name="searchfield" placeholder="Search country" class="svelte-6s1u2p"></div> <!>`, 1), SearchBox[FILENAME], [[29, 3, [[30, 5]]]]);
  function SearchBox($$anchor, $$props) {
    check_target(new.target);
    push($$props, true, SearchBox);
    let currentCountry = prop($$props, "currentCountry", 15), searched = prop($$props, "searched", 15), tooltipVisible = prop($$props, "tooltipVisible", 15);
    let results = state$1(proxy([]));
    let searchInput = state$1("");
    let isFocused = state$1(false);
    const onFocus = () => set(isFocused, true);
    const onBlur = () => set(isFocused, false);
    const newSearchInput = (oneResult) => {
      set(searchInput, proxy(oneResult.label, null, searchInput));
      currentCountry(oneResult.iso3c);
      searched(true);
      tooltipVisible(true);
    };
    var fragment = root$1();
    var div = first_child(fragment);
    var input = child(div);
    input.__input = [typeahead, $$props, searchInput, results];
    var node = sibling(div, 2);
    {
      var consequent_2 = ($$anchor2) => {
        var ul = root_1();
        var node_1 = child(ul);
        {
          var consequent_1 = ($$anchor3) => {
            var fragment_1 = comment();
            var node_2 = first_child(fragment_1);
            {
              var consequent = ($$anchor4) => {
                var fragment_2 = comment();
                var node_3 = first_child(fragment_2);
                each(node_3, 17, () => $$props.data, index, ($$anchor5, oneResult) => {
                  Objects($$anchor5, {
                    get object() {
                      return get(oneResult);
                    },
                    $$events: {
                      mousedown: () => newSearchInput(get(oneResult))
                    }
                  });
                });
                append($$anchor4, fragment_2);
              };
              var alternate = ($$anchor4) => {
                var fragment_4 = comment();
                var node_4 = first_child(fragment_4);
                each(node_4, 17, () => get(results), index, ($$anchor5, oneResult) => {
                  Objects($$anchor5, {
                    get object() {
                      return get(oneResult);
                    },
                    $$events: {
                      mousedown: () => newSearchInput(get(oneResult))
                    }
                  });
                });
                append($$anchor4, fragment_4);
              };
              if_block(node_2, ($$render) => {
                if (strict_equals(get(searchInput).length, 0)) $$render(consequent);
                else $$render(alternate, false);
              });
            }
            append($$anchor3, fragment_1);
          };
          if_block(node_1, ($$render) => {
            if (strict_equals(get(isFocused), true)) $$render(consequent_1);
          });
        }
        append($$anchor2, ul);
      };
      if_block(node, ($$render) => {
        if (get(searchInput).length > 1) $$render(consequent_2);
      });
    }
    event("focus", input, onFocus);
    event("blur", input, onBlur);
    bind_value(input, () => get(searchInput), ($$value) => set(searchInput, $$value));
    append($$anchor, fragment);
    return pop({ ...legacy_api() });
  }
  mark_module_end(SearchBox);
  delegate(["input"]);
  mark_module_start();
  Viz[FILENAME] = "src/Viz.svelte";
  function updateMouse(evt, mousePos) {
    set(mousePos, proxy({ x: evt.clientX, y: evt.clientY }, null, mousePos));
  }
  var root_3 = add_locations(/* @__PURE__ */ ns_template(`<svg><g><!><!></g></svg>`), Viz[FILENAME], [[85, 4, [[86, 6]]]]);
  var root_8 = add_locations(/* @__PURE__ */ template2(`<!> <!>`, 1), Viz[FILENAME], []);
  var root = add_locations(/* @__PURE__ */ template2(`<div class="chart-container svelte-1i5cyi5"><div class="header-container"><!></div> <div class="viz-container svelte-1i5cyi5"><!> <!> <!></div> <div class="legend-container svelte-1i5cyi5"><!></div> <div class="footer-container"><!></div></div>`), Viz[FILENAME], [
    [
      67,
      0,
      [
        [68, 2],
        [74, 2],
        [142, 2],
        [165, 2]
      ]
    ]
  ]);
  function Viz($$anchor, $$props) {
    check_target(new.target);
    push($$props, true, Viz);
    let width = state$1(500);
    let height = state$1(500);
    let margins = { top: 0, right: 0, bottom: 0, left: 0 };
    let valueType = /* @__PURE__ */ derived(() => $$props.data.plotdata.metadata.color.type);
    const noDataColor = wbColors.noData;
    let domainMinimum = /* @__PURE__ */ derived(() => strict_equals(typeof $$props.domainMin, "undefined") ? Math.floor(min$1($$props.data.plotdata.map((d) => d.color))) : $$props.domainMin);
    let domainMaximum = /* @__PURE__ */ derived(() => strict_equals(typeof $$props.domainMax, "undefined") ? Math.ceil(max$1($$props.data.plotdata.map((d) => d.color))) : $$props.domainMax);
    let dataDomain = /* @__PURE__ */ derived(() => extent($$props.data.plotdata, (d) => d.color));
    let customDomain = /* @__PURE__ */ derived(() => [
      get(domainMinimum),
      get(domainMaximum)
    ]);
    let domain = /* @__PURE__ */ derived(() => equals($$props.domainAutoCustom, "auto") ? get(dataDomain) : get(customDomain));
    let numericalColorScale = /* @__PURE__ */ derived(() => getNumericalColorScale($$props.data, get(domain), $$props.linearOrBinned, $$props.scaleType, $$props.colorScale, $$props.colorScaleDiverging, $$props.binningMode, $$props.numberOfBins));
    let categoricalColorScale = /* @__PURE__ */ derived(() => getCategoricalColorScale($$props.data));
    let currentCountry = state$1(void 0);
    let currentCountryData = /* @__PURE__ */ derived(() => $$props.data.plotdata.find((d) => equals(d.iso3c, get(currentCountry))));
    let mousePos = state$1(void 0);
    let tooltipVisible = state$1(false);
    let headerHeight = state$1(void 0);
    let legendHeight = state$1(void 0);
    let footerHeight = state$1(void 0);
    let vizHeight = /* @__PURE__ */ derived(() => $$props.showLegend ? get(height) - get(headerHeight) - get(legendHeight) - get(footerHeight) : get(height) - get(headerHeight) - get(footerHeight));
    let vizWidth = state$1(void 0);
    let searched = state$1(false);
    let currentTilePos = state$1(void 0);
    var div = root();
    var div_1 = child(div);
    var node = child(div_1);
    {
      var consequent = ($$anchor2) => {
        Header($$anchor2, {
          get title() {
            return $$props.title;
          },
          get subtitle() {
            return $$props.subtitle;
          }
        });
      };
      if_block(node, ($$render) => {
        if ($$props.title || $$props.subtitle) $$render(consequent);
      });
    }
    var div_2 = sibling(div_1, 2);
    var node_1 = child(div_2);
    {
      var consequent_1 = ($$anchor2) => {
        {
          add_owner_effect(() => get(currentCountry), SearchBox);
          add_owner_effect(() => get(searched), SearchBox);
          add_owner_effect(() => get(tooltipVisible), SearchBox);
          SearchBox($$anchor2, {
            get data() {
              return $$props.data.plotdata;
            },
            get currentCountry() {
              return get(currentCountry);
            },
            set currentCountry($$value) {
              set(currentCountry, proxy($$value, null, currentCountry));
            },
            get searched() {
              return get(searched);
            },
            set searched($$value) {
              set(searched, proxy($$value, null, searched));
            },
            get tooltipVisible() {
              return get(tooltipVisible);
            },
            set tooltipVisible($$value) {
              set(tooltipVisible, proxy($$value, null, tooltipVisible));
            }
          });
        }
      };
      if_block(node_1, ($$render) => {
        if ($$props.showSearchBox) $$render(consequent_1);
      });
    }
    var node_2 = sibling(node_1, 2);
    {
      var consequent_4 = ($$anchor2) => {
        var svg = root_3();
        svg.__mousemove = [updateMouse, mousePos];
        var g = child(svg);
        var node_3 = child(g);
        {
          var consequent_2 = ($$anchor3) => {
            {
              add_owner_effect(() => get(currentCountry), WorldSquareGrid);
              add_owner_effect(() => get(searched), WorldSquareGrid);
              add_owner_effect(() => get(currentTilePos), WorldSquareGrid);
              add_owner_effect(() => get(tooltipVisible), WorldSquareGrid);
              WorldSquareGrid($$anchor3, {
                get width() {
                  return get(vizWidth);
                },
                get height() {
                  return get(vizHeight);
                },
                get strokeWidth() {
                  return $$props.strokeWidth;
                },
                get stroke() {
                  return $$props.stroke;
                },
                get countryCodes() {
                  return $$props.countryCodes;
                },
                margins,
                noDataColor,
                get data() {
                  return $$props.data;
                },
                get numericalColorScale() {
                  return get(numericalColorScale);
                },
                get categoricalColorScale() {
                  return get(categoricalColorScale);
                },
                get currentCountry() {
                  return get(currentCountry);
                },
                set currentCountry($$value) {
                  set(currentCountry, proxy($$value, null, currentCountry));
                },
                get searched() {
                  return get(searched);
                },
                set searched($$value) {
                  set(searched, proxy($$value, null, searched));
                },
                get currentTilePos() {
                  return get(currentTilePos);
                },
                set currentTilePos($$value) {
                  set(currentTilePos, proxy($$value, null, currentTilePos));
                },
                get tooltipVisible() {
                  return get(tooltipVisible);
                },
                set tooltipVisible($$value) {
                  set(tooltipVisible, proxy($$value, null, tooltipVisible));
                }
              });
            }
          };
          if_block(node_3, ($$render) => {
            if (equals($$props.gridType, "squares")) $$render(consequent_2);
          });
        }
        var node_4 = sibling(node_3);
        {
          var consequent_3 = ($$anchor3) => {
            {
              add_owner_effect(() => get(currentCountry), WorldHexGrid);
              add_owner_effect(() => get(searched), WorldHexGrid);
              add_owner_effect(() => get(currentTilePos), WorldHexGrid);
              add_owner_effect(() => get(tooltipVisible), WorldHexGrid);
              WorldHexGrid($$anchor3, {
                get width() {
                  return get(vizWidth);
                },
                get height() {
                  return get(vizHeight);
                },
                get strokeWidth() {
                  return $$props.strokeWidth;
                },
                get stroke() {
                  return $$props.stroke;
                },
                get countryCodes() {
                  return $$props.countryCodes;
                },
                noDataColor,
                get data() {
                  return $$props.data;
                },
                get numericalColorScale() {
                  return get(numericalColorScale);
                },
                get categoricalColorScale() {
                  return get(categoricalColorScale);
                },
                get currentCountry() {
                  return get(currentCountry);
                },
                set currentCountry($$value) {
                  set(currentCountry, proxy($$value, null, currentCountry));
                },
                get searched() {
                  return get(searched);
                },
                set searched($$value) {
                  set(searched, proxy($$value, null, searched));
                },
                get currentTilePos() {
                  return get(currentTilePos);
                },
                set currentTilePos($$value) {
                  set(currentTilePos, proxy($$value, null, currentTilePos));
                },
                get tooltipVisible() {
                  return get(tooltipVisible);
                },
                set tooltipVisible($$value) {
                  set(tooltipVisible, proxy($$value, null, tooltipVisible));
                }
              });
            }
          };
          if_block(node_4, ($$render) => {
            if (equals($$props.gridType, "hexagons")) $$render(consequent_3);
          });
        }
        template_effect(() => {
          set_attribute(svg, "width", get(vizWidth));
          set_attribute(svg, "height", get(vizHeight));
          set_attribute(g, "transform", `translate(${margins.left},${margins.top})`);
        });
        append($$anchor2, svg);
      };
      if_block(node_2, ($$render) => {
        if (get(vizHeight)) $$render(consequent_4);
      });
    }
    var node_5 = sibling(node_2, 2);
    {
      var consequent_5 = ($$anchor2) => {
        const expression = /* @__PURE__ */ derived(() => get(searched) && get(currentTilePos) ? get(currentTilePos) : get(mousePos));
        Tooltip($$anchor2, {
          get visible() {
            return get(tooltipVisible);
          },
          get targetPos() {
            return get(expression);
          },
          children: wrap_snippet(Viz, ($$anchor3, $$slotProps) => {
            const expression_1 = /* @__PURE__ */ derived(() => equals(get(currentCountryData).color, null, false) && equals(get(currentCountryData).color, "", false) ? equals(get(valueType), "number") ? get(currentCountryData).color : get(currentCountryData).color : "No data");
            TooltipContent($$anchor3, {
              get tooltipHeader() {
                return get(currentCountryData).label;
              },
              get tooltipBody() {
                return get(expression_1);
              }
            });
          }),
          $$slots: { default: true }
        });
      };
      if_block(node_5, ($$render) => {
        if (get(currentCountryData) && get(mousePos)) $$render(consequent_5);
      });
    }
    var div_3 = sibling(div_2, 2);
    var node_6 = child(div_3);
    {
      var consequent_8 = ($$anchor2) => {
        var fragment_6 = root_8();
        var node_7 = first_child(fragment_6);
        {
          var consequent_6 = ($$anchor3) => {
            NumericalColorLegend($$anchor3, {
              get title() {
                return $$props.legendTitle;
              },
              get unitLabel() {
                return $$props.unitLabel;
              },
              get numericalColorScale() {
                return get(numericalColorScale);
              },
              get linearOrBinned() {
                return $$props.linearOrBinned;
              },
              get binningMode() {
                return $$props.binningMode;
              },
              get includeNoData() {
                return $$props.includeNoData;
              },
              get noDataLabel() {
                return $$props.noDataLabel;
              }
            });
          };
          if_block(node_7, ($$render) => {
            if (equals(get(valueType), "number")) $$render(consequent_6);
          });
        }
        var node_8 = sibling(node_7, 2);
        {
          var consequent_7 = ($$anchor3) => {
            CategoricalColorLegend($$anchor3, {
              get title() {
                return $$props.legendTitle;
              },
              get categoricalColorScale() {
                return get(categoricalColorScale);
              },
              get includeNoData() {
                return $$props.includeNoData;
              },
              get noDataLabel() {
                return $$props.noDataLabel;
              }
            });
          };
          if_block(node_8, ($$render) => {
            if (equals(get(valueType), "string")) $$render(consequent_7);
          });
        }
        append($$anchor2, fragment_6);
      };
      if_block(node_6, ($$render) => {
        if ($$props.showLegend) $$render(consequent_8);
      });
    }
    var div_4 = sibling(div_3, 2);
    var node_9 = child(div_4);
    {
      var consequent_9 = ($$anchor2) => {
        Footer($$anchor2, {
          get notesTitle() {
            return $$props.notesTitle;
          },
          get notes() {
            return $$props.notes;
          },
          get includeLogo() {
            return $$props.includeLogo;
          }
        });
      };
      if_block(node_9, ($$render) => {
        if ($$props.notesTitle || $$props.notes) $$render(consequent_9);
      });
    }
    bind_window_size("innerWidth", ($$value) => set(width, proxy($$value, null, width)));
    bind_window_size("innerHeight", ($$value) => set(height, proxy($$value, null, height)));
    bind_element_size(div_1, "clientHeight", ($$value) => set(headerHeight, $$value));
    bind_element_size(div_2, "clientWidth", ($$value) => set(vizWidth, $$value));
    bind_element_size(div_3, "clientHeight", ($$value) => set(legendHeight, $$value));
    bind_element_size(div_4, "clientHeight", ($$value) => set(footerHeight, $$value));
    append($$anchor, div);
    return pop({ ...legacy_api() });
  }
  mark_module_end(Viz);
  delegate(["mousemove"]);
  var font_link = document.createElement("link");
  font_link.setAttribute("rel", "stylesheet");
  document.body.appendChild(font_link);
  font_link.setAttribute("href", window.Flourish.static_prefix + "/style.css");
  var typograph_link = document.createElement("link");
  typograph_link.setAttribute("rel", "stylesheet");
  document.body.appendChild(typograph_link);
  typograph_link.setAttribute("href", window.Flourish.static_prefix + "/typography.css");
  var colors_link = document.createElement("link");
  colors_link.setAttribute("rel", "stylesheet");
  document.body.appendChild(colors_link);
  colors_link.setAttribute("href", window.Flourish.static_prefix + "/colors.css");
  var data = {};
  var state = {
    title: "Title",
    subtitle: "Subtitle",
    strokeWidth: 1,
    stroke: "#FFFFFF",
    countryCodes: true,
    scaleType: "sequential",
    linearOrBinned: "linear",
    colorScale: "seq",
    colorScaleDiverging: "div",
    binningMode: "fixedWidth",
    numberOfBins: 4,
    //categoricalColorPalette: "default",
    gridType: "squares",
    showLegend: true,
    legendTitle: "",
    includeNoData: false,
    noDataLabel: "No data",
    unitLabel: "",
    domainAutoCustom: "auto",
    domainMin: void 0,
    domainMax: void 0,
    notesTitle: "Source: ",
    notes: "World Bank",
    includeLogo: true,
    showSearchBox: false
  };
  let reactiveState = state$1(proxy({}));
  function draw() {
    set(reactiveState, proxy({ ...state }, null, reactiveState));
    get(reactiveState).data = data;
    mount(Viz, {
      target: document.body,
      props: get(reactiveState)
      // Pass the reactive state to Svelte
    });
  }
  function update() {
    Object.assign(get(reactiveState), state);
    get(reactiveState).data = data;
  }
  exports.data = data;
  exports.draw = draw;
  exports.state = state;
  exports.update = update;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
}({});
