import { Comment, computed, Fragment, getCurrentInstance, isVNode } from "vue";
import type { Slots, VNode, VNodeArrayChildren } from "vue";

type SlotMetaContext = {
  vnode: VNode;
  index: number;
  props: Record<string, any>;
};

export type SlotItem<TMeta = Record<string, any>> = {
  vnode: VNode;
  index: number;
  key: VNode["key"];
  props: Record<string, any>;
  meta: TMeta;
};

export type UseDefaultSlotItemsOptions<TMeta> = {
  slots?: Slots;
  filter?: (ctx: SlotMetaContext) => boolean;
  mapMeta?: (ctx: SlotMetaContext) => TMeta;
};

/** Composable to extract and manage items from the default slot. */
export function useDefaultSlotItems<TMeta = Record<string, any>>(
  options: UseDefaultSlotItemsOptions<TMeta> = {}
) {
  const instance = getCurrentInstance();
  const slots = options.slots ?? instance?.slots;

  const items = computed<SlotItem<TMeta>[]>(() => {
    const rawChildren = slots?.default?.() ?? [];
    const nodes = flattenVNodes(rawChildren);

    return nodes
      .map((vnode, index) => {
        const props = (vnode.props ?? {}) as Record<string, any>;
        const ctx: SlotMetaContext = { vnode, index, props };

        if (options.filter && !options.filter(ctx)) {
          return undefined;
        }

        return {
          vnode,
          index,
          key: vnode.key ?? index,
          props,
          meta: options.mapMeta ? options.mapMeta(ctx) : (props as TMeta),
        };
      })
      .filter(Boolean) as SlotItem<TMeta>[];
  });

  return {
    items,
    first: computed(() => items.value[0]),
    find: (predicate: (item: SlotItem<TMeta>) => boolean) => items.value.find(predicate),
  };
}

function flattenVNodes(children: VNodeArrayChildren, acc: VNode[] = []): VNode[] {
  children.forEach((child) => {
    if (!child) return;

    if (Array.isArray(child)) {
      flattenVNodes(child, acc);
      return;
    }

    if (!isVNode(child)) {
      return;
    }

    if (child.type === Comment) {
      return;
    }

    if (child.type === Fragment && Array.isArray(child.children)) {
      flattenVNodes(child.children as VNodeArrayChildren, acc);
      return;
    }

    acc.push(child);
  });

  return acc;
}
