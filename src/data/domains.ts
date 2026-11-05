import type { Locale } from "../lib/copy";
export type DomainOffer = "acquisition" | "license" | "partnership";
export interface DomainListing {
  domain: string;
  published: boolean;
  ownerApproved: boolean;
  /** Date of the owner's approval to publish; not proof of registrar verification. */
  reviewedAt: string;
  offerTypes: DomainOffer[];
  /** Display two extensions together when they represent the same opportunity. */
  groupId?: string;
  locale: Record<Locale,{summary:string}>;
}
// Owner-approved public selections on 10 October 2026.
// Marketplace listing status, pricing and ownership transfer terms are not asserted here.
export const domainListings: DomainListing[] = [
  {
    "domain": "x99.vn",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-11",
    "offerTypes": [
      "partnership"
    ],
    "locale": {
      "en": {
        "summary": "Open to collaboration inquiries."
      },
      "vi": {
        "summary": "Tiếp nhận đề xuất hợp tác khai thác."
      }
    }
  },
  {
    "domain": "buiduong.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "partnership"
    ],
    "locale": {
      "en": {
        "summary": "Everyday people, local places and overlooked stories."
      },
      "vi": {
        "summary": "Chuyện đời thường, con người, địa điểm và những điều ít được kể."
      }
    }
  },
  {
    "domain": "cayduong.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "partnership"
    ],
    "locale": {
      "en": {
        "summary": "Local history, places and community ideas connected to Cây Dương."
      },
      "vi": {
        "summary": "Ký ức, địa phương và ý tưởng cộng đồng gắn với Cây Dương."
      }
    }
  },
  {
    "domain": "phunghiep.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "partnership"
    ],
    "locale": {
      "en": {
        "summary": "Stories, places and community initiatives connected to Phụng Hiệp."
      },
      "vi": {
        "summary": "Câu chuyện, địa điểm và ý tưởng cộng đồng gắn với Phụng Hiệp."
      }
    }
  },
  {
    "domain": "datchinhrong.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "partnership"
    ],
    "groupId": "datchinhrong",
    "locale": {
      "en": {
        "summary": "A possible cultural and storytelling project about the Mekong Delta."
      },
      "vi": {
        "summary": "Định hướng nội dung văn hóa và câu chuyện vùng đất Chín Rồng."
      }
    }
  },
  {
    "domain": "datchinhrong.vn",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "partnership"
    ],
    "groupId": "datchinhrong",
    "locale": {
      "en": {
        "summary": "A possible cultural and storytelling project about the Mekong Delta."
      },
      "vi": {
        "summary": "Định hướng nội dung văn hóa và câu chuyện vùng đất Chín Rồng."
      }
    }
  },
  {
    "domain": "1368x.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "Short alphanumeric brand name."
      },
      "vi": {
        "summary": "Tên thương hiệu ngắn kết hợp số và chữ."
      }
    }
  },
  {
    "domain": "onymid.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "Abstract, identity-inspired brand name."
      },
      "vi": {
        "summary": "Tên thương hiệu trừu tượng gợi chủ đề danh tính."
      }
    }
  },
  {
    "domain": "onymiq.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "Abstract, technology-oriented brand name."
      },
      "vi": {
        "summary": "Tên ngắn gợi hướng công nghệ."
      }
    }
  },
  {
    "domain": "onymai.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "Brandable name with an AI-oriented sound."
      },
      "vi": {
        "summary": "Tên thương hiệu gợi liên tưởng tới AI."
      }
    }
  },
  {
    "domain": "trueonym.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "A name with an identity-related theme."
      },
      "vi": {
        "summary": "Tên gọi gợi chủ đề danh tính."
      }
    }
  },
  {
    "domain": "qkmatrix.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "A possible fit for data and matrix-based tools."
      },
      "vi": {
        "summary": "Có thể phù hợp với công cụ dữ liệu và ma trận."
      }
    }
  },
  {
    "domain": "chipletoptics.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "Descriptive name for chiplet and optics concepts."
      },
      "vi": {
        "summary": "Tên gợi lĩnh vực chiplet và quang học."
      }
    }
  },
  {
    "domain": "xpuoptics.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "A name connecting computing and optics concepts."
      },
      "vi": {
        "summary": "Tên gợi kết nối điện toán và quang học."
      }
    }
  },
  {
    "domain": "awbiq.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "Short, abstract brandable name."
      },
      "vi": {
        "summary": "Tên ngắn, trừu tượng, phù hợp xây dựng thương hiệu."
      }
    }
  },
  {
    "domain": "uldid.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "Short brand name with a digital identity feel."
      },
      "vi": {
        "summary": "Tên ngắn gợi ý tưởng nhận diện số."
      }
    }
  },
  {
    "domain": "eblapi.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "A possible fit for an API-oriented digital product."
      },
      "vi": {
        "summary": "Có thể phù hợp với sản phẩm số liên quan API."
      }
    }
  },
  {
    "domain": "dockturn.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "A name with logistics and dock-related associations."
      },
      "vi": {
        "summary": "Tên gợi liên tưởng đến logistics và bến bãi."
      }
    }
  },
  {
    "domain": "teurate.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "A name with container-shipping rate associations."
      },
      "vi": {
        "summary": "Tên gợi chủ đề cước vận chuyển container."
      }
    }
  },
  {
    "domain": "teusync.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "A name with container logistics and synchronization associations."
      },
      "vi": {
        "summary": "Tên gợi logistics container và đồng bộ dữ liệu."
      }
    }
  },
  {
    "domain": "dockcycle.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "A name with logistics and operational associations."
      },
      "vi": {
        "summary": "Tên gợi hoạt động logistics và vận hành."
      }
    }
  },
  {
    "domain": "trailermetric.com",
    "published": true,
    "ownerApproved": true,
    "reviewedAt": "2026-10-10",
    "offerTypes": [
      "acquisition",
      "license"
    ],
    "locale": {
      "en": {
        "summary": "A name for possible trailer and transport analytics ideas."
      },
      "vi": {
        "summary": "Tên gợi phân tích dữ liệu rơ-moóc và vận tải."
      }
    }
  }
];

export function getPublicDomains() {
  const names = new Set<string>();
  for (const d of domainListings) {
    if (names.has(d.domain.toLowerCase()) || !/^[a-z0-9.-]+$/i.test(d.domain)) throw new Error("Invalid/duplicate domain");
    names.add(d.domain.toLowerCase());
    if (d.published && (!d.ownerApproved || !d.reviewedAt || !d.offerTypes.length || !d.locale.en?.summary || !d.locale.vi?.summary)) throw new Error("Unapproved domain listing: " + d.domain);
    if (d.offerTypes.includes("partnership") && d.offerTypes.some(o=>o!=="partnership")) throw new Error("Ambiguous public domain category: "+d.domain);
  }
  return domainListings.filter(d=>d.published && d.ownerApproved);
}
