using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IImporter
{
    public interface ImporterInterface
    {
        void Import();
        public string GetName();
    }
}
