const DATA_URL = new URL('./data/research-knowledge.json', import.meta.url);

const DEFAULT_KNOWLEDGE = Object.freeze({
  entityTypes: {},
  entities: [],
  hubSections: [],
  inclusiveSections: [],
  navItems: [],
  typeOrder: ['all'],
  selectedInitialId: null,
});

const REQUIRED_ENTITY_FIELDS = ['id', 'type', 'title', 'status', 'updated', 'owner', 'tags', 'section', 'summary'];
const asArray = (value) => (Array.isArray(value) ? value : []);
const asString = (value) => (typeof value === 'string' ? value.trim() : '');

function normalizeStringList(value) {
  return asArray(value).map(asString).filter(Boolean);
}

function normalizeEntity(entity) {
  const normalized = {
    ...entity,
    id: asString(entity?.id),
    type: asString(entity?.type),
    title: asString(entity?.title),
    subtitle: asString(entity?.subtitle),
    status: asString(entity?.status),
    updated: asString(entity?.updated),
    owner: asString(entity?.owner),
    section: asString(entity?.section),
    summary: asString(entity?.summary),
    hypothesis: asString(entity?.hypothesis),
    methodology: asString(entity?.methodology),
    purpose: asString(entity?.purpose),
    responsible: asString(entity?.responsible),
    eligibility: asString(entity?.eligibility),
    authors: asString(entity?.authors),
    isbn: asString(entity?.isbn),
    official: asString(entity?.official),
    markdown: asString(entity?.markdown),
    tags: normalizeStringList(entity?.tags),
    evidence: normalizeStringList(entity?.evidence),
    citations: normalizeStringList(entity?.citations),
    articles: normalizeStringList(entity?.articles),
    requirements: normalizeStringList(entity?.requirements),
    versions: asArray(entity?.versions)
      .map((version) => asArray(version).map(asString))
      .filter((version) => version.length >= 3 && version.every(Boolean)),
  };

  const isValid = REQUIRED_ENTITY_FIELDS.every((field) => {
    const value = normalized[field];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  });

  return isValid ? normalized : null;
}

function normalizeKnowledge(raw) {
  const entities = asArray(raw?.entities).map(normalizeEntity).filter(Boolean);
  const availableTypes = new Set(entities.map((entity) => entity.type));
  const entityTypes = Object.fromEntries(
    Object.entries(raw?.entityTypes || {}).filter(([type, label]) => availableTypes.has(type) && asString(label))
  );

  return {
    entityTypes,
    entities,
    hubSections: asArray(raw?.hubSections).filter((section) => Array.isArray(section) && section.length >= 2),
    inclusiveSections: normalizeStringList(raw?.inclusiveSections),
    navItems: asArray(raw?.navItems).filter((item) => Array.isArray(item) && item.length >= 2),
    typeOrder: normalizeStringList(raw?.typeOrder).filter((type) => type === 'all' || availableTypes.has(type)),
    selectedInitialId: entities.some((entity) => entity.id === raw?.selectedInitialId)
      ? raw.selectedInitialId
      : entities[0]?.id || null,
  };
}

export class ResearchRepository {
  constructor({ dataUrl = DATA_URL } = {}) {
    this.dataUrl = dataUrl;
    this.knowledge = DEFAULT_KNOWLEDGE;
  }

  async load() {
    try {
      const response = await fetch(this.dataUrl);
      if (!response.ok) throw new Error(`Research data request failed: ${response.status}`);
      this.knowledge = normalizeKnowledge(await response.json());
    } catch (error) {
      console.error('[research] Unable to load knowledge repository', error);
      this.knowledge = DEFAULT_KNOWLEDGE;
    }

    return this.getSnapshot();
  }

  getSnapshot() {
    return this.knowledge;
  }

  get entityTypes() {
    return this.knowledge.entityTypes;
  }

  get selectedInitialId() {
    return this.knowledge.selectedInitialId;
  }

  getUniqueTags() {
    return [...new Set(this.knowledge.entities.flatMap((entity) => entity.tags))]
      .sort((a, b) => a.localeCompare(b, 'es'));
  }

  getEntityById(id) {
    return this.knowledge.entities.find((entity) => entity.id === id) || null;
  }

  filterEntities({ query = '', type = 'all', section = 'all', tag = 'all' } = {}) {
    const normalizedQuery = query.trim().toLowerCase();

    return this.knowledge.entities.filter((entity) => {
      const haystack = [
        entity.title,
        entity.subtitle,
        entity.summary,
        entity.status,
        entity.owner,
        entity.section,
        entity.hypothesis,
        entity.methodology,
        ...entity.tags,
        ...entity.articles,
        ...entity.requirements,
      ].join(' ').toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      const matchesType = type === 'all' || entity.type === type;
      const matchesSection = section === 'all' || entity.section === section;
      const matchesTag = tag === 'all' || entity.tags.includes(tag);
      return matchesQuery && matchesType && matchesSection && matchesTag;
    });
  }

  relationScore(source, target) {
    if (!source || !target || source.id === target.id) return 0;
    const sharedTags = source.tags.filter((tag) => target.tags.includes(tag)).length;
    const explicitCitation = source.citations.includes(target.id) || target.citations.includes(source.id) ? 4 : 0;
    return sharedTags + explicitCitation;
  }

  relatedEntities(entity, limit = 8) {
    if (!entity) return [];

    return this.knowledge.entities
      .map((candidate) => ({ ...candidate, relationScore: this.relationScore(entity, candidate) }))
      .filter((candidate) => candidate.relationScore > 0)
      .sort((a, b) => b.relationScore - a.relationScore || a.title.localeCompare(b.title, 'es'))
      .slice(0, limit);
  }

  graphEdges(scope = this.knowledge.entities) {
    const scopedIds = new Set(scope.map((entity) => entity.id));
    const edges = [];

    scope.forEach((source) => {
      this.relatedEntities(source, 6).forEach((target) => {
        if (!scopedIds.has(target.id)) return;
        const key = [source.id, target.id].sort().join('|');
        if (edges.some((edge) => edge.key === key)) return;
        edges.push({
          key,
          source,
          target,
          shared: source.tags.filter((tag) => target.tags.includes(tag)),
        });
      });
    });

    return edges.sort((a, b) => b.shared.length - a.shared.length).slice(0, 18);
  }
}
