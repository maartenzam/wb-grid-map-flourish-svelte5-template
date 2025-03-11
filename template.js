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
  const INSPECT_EFFECT = 1 << 18;
  const HEAD_EFFECT = 1 << 19;
  const EFFECT_HAS_DERIVED = 1 << 20;
  const STATE_SYMBOL = Symbol("$state");
  const STATE_SYMBOL_METADATA = Symbol("$state metadata");
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
  function equals(value) {
    return value === this.v;
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
  let tracing_mode_flag = false;
  var bold$1 = "font-weight: bold";
  var normal$1 = "font-weight: normal";
  function state_snapshot_uncloneable(properties) {
    {
      console.warn(`%c[svelte] state_snapshot_uncloneable
%c${properties ? `The following properties cannot be cloned with \`$state.snapshot\` — the return value contains the originals:

${properties}` : "Value cannot be cloned with `$state.snapshot` — the original value was returned"}
https://svelte.dev/e/state_snapshot_uncloneable`, bold$1, normal$1);
    }
  }
  const empty = [];
  function snapshot(value, skip_warning = false) {
    if (!skip_warning) {
      const paths = [];
      const copy = clone(value, /* @__PURE__ */ new Map(), "", paths);
      if (paths.length === 1 && paths[0] === "") {
        state_snapshot_uncloneable();
      } else if (paths.length > 0) {
        const slice = paths.length > 10 ? paths.slice(0, 7) : paths.slice(0, 10);
        const excess = paths.length - slice.length;
        let uncloned = slice.map((path) => `- <value>${path}`).join("\n");
        if (excess > 0) uncloned += `
- ...and ${excess} more`;
        state_snapshot_uncloneable(uncloned);
      }
      return copy;
    }
    return clone(value, /* @__PURE__ */ new Map(), "", empty);
  }
  function clone(value, cloned, path, paths, original = null) {
    if (typeof value === "object" && value !== null) {
      var unwrapped = cloned.get(value);
      if (unwrapped !== void 0) return unwrapped;
      if (value instanceof Map) return (
        /** @type {Snapshot<T>} */
        new Map(value)
      );
      if (value instanceof Set) return (
        /** @type {Snapshot<T>} */
        new Set(value)
      );
      if (is_array(value)) {
        var copy = (
          /** @type {Snapshot<any>} */
          Array(value.length)
        );
        cloned.set(value, copy);
        if (original !== null) {
          cloned.set(original, copy);
        }
        for (var i = 0; i < value.length; i += 1) {
          var element = value[i];
          if (i in value) {
            copy[i] = clone(element, cloned, `${path}[${i}]`, paths);
          }
        }
        return copy;
      }
      if (get_prototype_of(value) === object_prototype) {
        copy = {};
        cloned.set(value, copy);
        if (original !== null) {
          cloned.set(original, copy);
        }
        for (var key in value) {
          copy[key] = clone(value[key], cloned, `${path}.${key}`, paths);
        }
        return copy;
      }
      if (value instanceof Date) {
        return (
          /** @type {Snapshot<T>} */
          structuredClone(value)
        );
      }
      if (typeof /** @type {T & { toJSON?: any } } */
      value.toJSON === "function") {
        return clone(
          /** @type {T & { toJSON(): any } } */
          value.toJSON(),
          cloned,
          `${path}.toJSON()`,
          paths,
          // Associate the instance with the toJSON clone
          value
        );
      }
    }
    if (value instanceof EventTarget) {
      return (
        /** @type {Snapshot<T>} */
        value
      );
    }
    try {
      return (
        /** @type {Snapshot<T>} */
        structuredClone(value)
      );
    } catch (e) {
      {
        paths.push(path);
      }
      return (
        /** @type {Snapshot<T>} */
        value
      );
    }
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
      equals,
      rv: 0,
      wv: 0
    };
    return signal;
  }
  function state$1(v) {
    return /* @__PURE__ */ push_derived_source(source(v));
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
      if (active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
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
    var length = reactions.length;
    for (var i = 0; i < length; i++) {
      var reaction = reactions[i];
      var flags = reaction.f;
      if ((flags & DIRTY) !== 0) continue;
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
      equals,
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
        defineProperty(_, prop, descriptor) {
          if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
            state_descriptors_fixed();
          }
          var s = sources.get(prop);
          if (s === void 0) {
            s = source(descriptor.value);
            sources.set(prop, s);
          } else {
            set(s, proxy(descriptor.value, metadata));
          }
          return true;
        },
        deleteProperty(target, prop) {
          var s = sources.get(prop);
          if (s === void 0) {
            if (prop in target) {
              sources.set(prop, source(UNINITIALIZED));
            }
          } else {
            if (is_proxied_array && typeof prop === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop);
              if (Number.isInteger(n) && n < ls.v) {
                set(ls, n);
              }
            }
            set(s, UNINITIALIZED);
            update_version(version);
          }
          return true;
        },
        get(target, prop, receiver) {
          var _a2;
          if (prop === STATE_SYMBOL_METADATA) {
            return metadata;
          }
          if (prop === STATE_SYMBOL) {
            return value;
          }
          var s = sources.get(prop);
          var exists = prop in target;
          if (s === void 0 && (!exists || ((_a2 = get_descriptor(target, prop)) == null ? void 0 : _a2.writable))) {
            s = source(proxy(exists ? target[prop] : UNINITIALIZED, metadata));
            sources.set(prop, s);
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
          return Reflect.get(target, prop, receiver);
        },
        getOwnPropertyDescriptor(target, prop) {
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
          if (descriptor && "value" in descriptor) {
            var s = sources.get(prop);
            if (s) descriptor.value = get(s);
          } else if (descriptor === void 0) {
            var source2 = sources.get(prop);
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
        has(target, prop) {
          var _a2;
          if (prop === STATE_SYMBOL_METADATA) {
            return true;
          }
          if (prop === STATE_SYMBOL) {
            return true;
          }
          var s = sources.get(prop);
          var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop);
          if (s !== void 0 || active_effect !== null && (!has || ((_a2 = get_descriptor(target, prop)) == null ? void 0 : _a2.writable))) {
            if (s === void 0) {
              s = source(has ? proxy(target[prop], metadata) : UNINITIALIZED);
              sources.set(prop, s);
            }
            var value2 = get(s);
            if (value2 === UNINITIALIZED) {
              return false;
            }
          }
          return has;
        },
        set(target, prop, value2, receiver) {
          var _a2;
          var s = sources.get(prop);
          var has = prop in target;
          if (is_proxied_array && prop === "length") {
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
            if (!has || ((_a2 = get_descriptor(target, prop)) == null ? void 0 : _a2.writable)) {
              s = source(void 0);
              set(s, proxy(value2, metadata));
              sources.set(prop, s);
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
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
          if (descriptor == null ? void 0 : descriptor.set) {
            descriptor.set.call(receiver, value2);
          }
          if (!has) {
            if (is_proxied_array && typeof prop === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop);
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
      const index = indexOf.call(this, item, from_index);
      if (index === -1) {
        for (let i = from_index ?? 0; i < this.length; i += 1) {
          if (get_proxied_value(this[i]) === item) {
            state_proxy_equality_mismatch("array.indexOf(...)");
            break;
          }
        }
      }
      return index;
    };
    array_prototype2.lastIndexOf = function(item, from_index) {
      const index = lastIndexOf.call(this, item, from_index ?? this.length - 1);
      if (index === -1) {
        for (let i = 0; i <= (from_index ?? this.length - 1); i += 1) {
          if (get_proxied_value(this[i]) === item) {
            state_proxy_equality_mismatch("array.lastIndexOf(...)");
            break;
          }
        }
      }
      return index;
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
      var index = index_of.call(reactions, signal);
      if (index !== -1) {
        var new_length = reactions.length - 1;
        if (new_length === 0) {
          reactions = dependency.reactions = null;
        } else {
          reactions[index] = reactions[new_length];
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
  function inspect_effect(fn) {
    return create_effect(INSPECT_EFFECT, fn, true);
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
    return true;
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
  const all_registered_events = /* @__PURE__ */ new Set();
  const root_event_handles = /* @__PURE__ */ new Set();
  function handle_event_propagation(event) {
    var _a;
    var handler_element = this;
    var owner_document = (
      /** @type {Node} */
      handler_element.ownerDocument
    );
    var event_name = event.type;
    var path = ((_a = event.composedPath) == null ? void 0 : _a.call(event)) || [];
    var current_target = (
      /** @type {null | Element} */
      path[0] || event.target
    );
    var path_idx = 0;
    var handled_at = event.__root;
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
      window)) {
        event.__root = handler_element;
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
    path[path_idx] || event.target;
    if (current_target === handler_element) return;
    define_property(event, "currentTarget", {
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
          event.target === current_target)) {
            if (is_array(delegated)) {
              var [fn, ...data2] = delegated;
              fn.apply(current_target, [event, ...data2]);
            } else {
              delegated.call(current_target, event);
            }
          }
        } catch (error) {
          if (throw_error) {
            other_errors.push(error);
          } else {
            throw_error = error;
          }
        }
        if (event.cancelBubble || parent_element === handler_element || parent_element === null) {
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
      event.__root = handler_element;
      delete event.currentTarget;
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
    var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;
    var node;
    var has_start = !content.startsWith("<!>");
    return () => {
      if (node === void 0) {
        node = create_fragment_from_html(has_start ? content : "<!>" + content);
        node = /** @type {Node} */
        /* @__PURE__ */ get_first_child(node);
      }
      var clone2 = (
        /** @type {TemplateNode} */
        use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
      );
      {
        assign_nodes(clone2, clone2);
      }
      return clone2;
    };
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
  function inspect(get_value, inspector = console.log) {
    validate_effect("$inspect");
    let initial = true;
    inspect_effect(() => {
      var value = UNINITIALIZED;
      try {
        value = get_value();
      } catch (error) {
        console.error(error);
      }
      if (value !== UNINITIALIZED) {
        inspector(initial ? "init" : "update", ...snapshot(value, true));
      }
      initial = false;
    });
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
  function bind_window_size(type, set2) {
    listen(window, ["resize"], () => without_reactive_context(() => set2(window[type])));
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
  const PUBLIC_VERSION = "5";
  if (typeof window !== "undefined")
    (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
  mark_module_start();
  Header[FILENAME] = "src/template/Header.svelte";
  var root$2 = add_locations(/* @__PURE__ */ template2(`<div class="header svelte-1cps9pi"><h2 class="title svelte-1cps9pi"> </h2> <h3 class="subtitle svelte-1cps9pi"> </h3></div>`), Header[FILENAME], [[5, 0, [[6, 2], [7, 2]]]]);
  function Header($$anchor, $$props) {
    check_target(new.target);
    push($$props, true, Header);
    var div = root$2();
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
  var root_1 = add_locations(/* @__PURE__ */ template2(`<div class="logo svelte-g4y3d9"><img alt="World Bank logo" class="svelte-g4y3d9"></div>`), Footer[FILENAME], [[9, 4, [[9, 22]]]]);
  var root$1 = add_locations(/* @__PURE__ */ template2(`<div class="footer svelte-g4y3d9"><div class="notes svelte-g4y3d9"><span class="notes-title svelte-g4y3d9"> </span> </div> <!></div>`), Footer[FILENAME], [
    [6, 0, [[7, 4, [[7, 23]]]]]
  ]);
  function Footer($$anchor, $$props) {
    check_target(new.target);
    push($$props, true, Footer);
    var div = root$1();
    var div_1 = child(div);
    var span = child(div_1);
    var text = child(span);
    var text_1 = sibling(span, 1, true);
    var node = sibling(div_1, 2);
    {
      var consequent = ($$anchor2) => {
        var div_2 = root_1();
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
  mark_module_start();
  Viz[FILENAME] = "src/Viz.svelte";
  var root = add_locations(/* @__PURE__ */ template2(`<div class="chart-container svelte-1xm5ugn"><div class="header-container"><!></div> <div class="viz-container svelte-1xm5ugn"><svg><circle stroke="black"></circle></svg></div> <div class="footer-container"><!></div></div>`), Viz[FILENAME], [
    [
      22,
      0,
      [
        [23, 2],
        [29, 2, [[30, 4, [[31, 6]]]]],
        [42, 2]
      ]
    ]
  ]);
  function Viz($$anchor, $$props) {
    check_target(new.target);
    push($$props, true, Viz);
    inspect(() => [$$props.data.plotdata]);
    let width = state$1(500);
    let height = state$1(500);
    let headerHeight = state$1(void 0);
    let footerHeight = state$1(void 0);
    let vizHeight = /* @__PURE__ */ derived(() => get(headerHeight) && get(footerHeight) ? get(height) - get(headerHeight) - get(footerHeight) : get(height));
    let vizWidth = state$1(void 0);
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
    var svg = child(div_2);
    var circle = child(svg);
    var div_3 = sibling(div_2, 2);
    var node_1 = child(div_3);
    Footer(node_1, {
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
    template_effect(() => {
      set_attribute(svg, "width", get(vizWidth));
      set_attribute(svg, "height", get(vizHeight));
      set_attribute(circle, "cx", get(width) / 2);
      set_attribute(circle, "cy", get(height) / 2);
      set_attribute(circle, "r", $$props.radius);
      set_attribute(circle, "fill", $$props.color);
      set_attribute(circle, "stroke-width", $$props.stroke);
    });
    bind_window_size("innerWidth", ($$value) => set(width, proxy($$value, null, width)));
    bind_window_size("innerHeight", ($$value) => set(height, proxy($$value, null, height)));
    bind_element_size(div_1, "clientHeight", ($$value) => set(headerHeight, $$value));
    bind_element_size(div_2, "clientWidth", ($$value) => set(vizWidth, $$value));
    bind_element_size(div_3, "clientHeight", ($$value) => set(footerHeight, $$value));
    append($$anchor, div);
    return pop({ ...legacy_api() });
  }
  mark_module_end(Viz);
  let font_link = document.createElement("link");
  font_link.setAttribute("rel", "stylesheet");
  document.body.appendChild(font_link);
  font_link.setAttribute("href", window.Flourish.static_prefix + "/style.css");
  let typograph_link = document.createElement("link");
  typograph_link.setAttribute("rel", "stylesheet");
  document.body.appendChild(typograph_link);
  typograph_link.setAttribute("href", window.Flourish.static_prefix + "/typography.css");
  let colors_link = document.createElement("link");
  colors_link.setAttribute("rel", "stylesheet");
  document.body.appendChild(colors_link);
  colors_link.setAttribute("href", window.Flourish.static_prefix + "/colors.css");
  var data = {};
  var state = {
    title: "",
    subtitle: "",
    radius: 50,
    stroke: 2,
    color: "#ffffff",
    notesTitle: "",
    notes: "",
    includeLogo: false
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
    if (state.radius <= 0) throw new Error("Radius must be positive");
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
